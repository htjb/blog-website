---
type: post
date: 01/11/2025
tags: llms, machine learning
---

# Building a Large Language Model: Part 2

In the [previous post](https://harrybevins.co.uk/#post-building-a-large-language-model-part-1) in this series, I introduced my ambitious project to build a language model with PyTorch and a JavaScript frontend. I discussed the need for large corpuses of training data and demonstrated how we could download articles scraped from [wikipedia](https://www.wikipedia.org/) using the `huggingface` datasets library.

In this post I will discuss how we turn this data into something that is `readable` by the neural network through tokenisation. I'll introduce two different methods to tokenise our data and explain some other more nuanced considerations we have to make, but first I will try and explain what tokenisation actually is.

## Tokenisation and Vocab Building

In order to build a language model we need a way to encode words or parts of words and punctuation into numerical values. This mapping has to be deterministic so that the network can learn patterns, and we can decode its predictions. We call this mapping a vocabulary, and we call the objects in our vocabulary tokens. Tokens can be either full words or parts of words and punctuation. As an example we might have a phrase in our data set along the lines of "what is the weather like?" and tokenisation might turn this into [60 1096 23 1096 5 1096 1081 1096 502].

There are a few different algorithms we can use to take our corpus of text and build a vocabulary. Below I discuss two different algorithms, Bag-of-Words (BoW) and Byte Pair Encoding (BPE).

But first we need to load in our data line by line, remove any empty lines and trailing whitespace with `.strip()` and then split the lines based on punctuation. The regex in the below code looks for punctuation marks `.!?` with trailing whitespace like line breaks, tabs or spaces and splits each line at those points. For example, the phrase "Hello world! how are you?" would be split into `["Hello world!", "how are you?"]. Splitting on punctuation is important because it helps our model learn how to terminate a sentence and prevents it predicting large swathes of punctuation free text. I also clean out accents from the text corpus and non-latin characters like Cyrillic, Chinese, Arabic, Greek letters, emoji, etc.. In practice, you would want to keep these characters, but I am removing just to make my vocabulary a bit more manageable for my toy example. You might also want to put everything in lower case and filter the data for anything controversial that we don't want to train on. However since I am working with the simple wiki data set and only building a toy model this level of preprocessing is probably sufficient.

The final step before building my vocabulary is to split my text into training, test and validation sets so that I am not using the test or validation data to build my vocabulary.

```python
model_name = "simple-wiki"
files = glob.glob("data/" + model_name + "/*.txt")[:50000]

text = []
for f in files:
    with open(f, "r") as file:
        text.append(file.readlines())  # Read the text file line by line
text = np.concatenate(text)
text = [
    re.split(r"(?<=[.!?])\s+", line.strip()) for line in text if line.strip()
]  # Remove empty lines and split on punctuation
text = np.concatenate(text).tolist()
text = [clean_non_latin(t) for t in text]

# Train/test/val split shuffles by default
train, test = train_test_split(text, test_size=0.3, random_state=42)
test, val = train_test_split(test, test_size=0.5, random_state=42)
```

Once I have a preprocessed training data set I can go ahead and think about how to build my mapping between numerical values my network can understand and the words in the data set.

## Bag of Words

Bag-of-Words or BoW is probably the simplest tokenisation algorithm. The idea is basically to look for unique whole words and punctuation marks in the corpus, count how many times they appear and rank them based on their frequency. In the phrase "I am well thank you! I wanted to talk to you." the words "I", "you" and "to" all appear twice and the other words only once so our vocabulary might look like 

```
vocab = {1: "I", 2: "you", 3: "to", 4: "am", 5: "well", 6: "thank", 7: "!", 8: "wanted", 9: "talk", 10: ".", 11: " "}
```

The corresponding codified phrase in our training data would be 

```
[1, 11, 4, 11, 5, 11, 6, 11, 2, 7, 11, 1, 11, 8, 11, 3, 11, 9, 11, 3, 11, 2, 10]
```

The observant reader will notice that the `" "` is coded as the 11th most frequent character in the data. Of course, it is actually the most frequent! During BoW and other tokenisation algorithms, however, the data is usually split based on spaces. So the `" "` is added into the vocabulary after we have looked through the training data for unique tokens. We also usually add an `"UNK"` token so that our model can react when it sees something that is not in its vocabulary, and we will add an `"EOS"` token after sentence ending punctuation. The `"EOS"` token helps our model identify when a sentence or phrase has ended and helps when we are making predictions to form coherent answers. 

We might also add a `"PAD"` token. The sentences in our training data will all be of different lengths, but we need to batch our data for training, and we need our model to be able to cope with varying sentence lengths. We define some maximum context for our model known as the context window and then pad sentences up to that. The `"PAD"` token is usually mapped to 0 or the vocabulary length plus one. So if our context window is 32 then our sentence above is tokenized to

```
[1, 11, 4, 11, 5, 11, 6, 11, 2, 7, 11, 1, 11, 8, 11, 3, 11, 9, 11, 3, 11, 2, 10, 0, 0, 0, 0, 0, 0, 0]
```

So in BoW our vocabulary model is made up of whole words, common punctuation marks and special characters like `"EOS"`, `"UNK"` and `"PAD"`.

## Byte Pair Encoding

BoW is conceptually quite nice and simple to wrap your head around. The issue is that it significantly limits the expressivity of our network to the specific set of words in our training data. Often we build our vocabulary from a subset of our training data because it's a computationally expensive process so our BoW model might not even capture the true diversity of our training corpus. If our network sees a word that it has not previously encountered it will have no way for it to understand its context. We can overcome this limitation somewhat by increasing the size and diversity of our training data, but it is not ideal.

An alternative approach and the one that is actually used is to tokenise our corpus using subwords.

```python
class bpe:
    def __init__(self, text, num_merges=1000):
        tokenized = [
            re.findall(r"\w+|[^\w\s]", line, flags=re.UNICODE) for line in text
        ]

        words = [list(word) for word in np.concatenate(tokenized)]

        mergers = 0
        merger_rules = {}
        while mergers < num_merges:
            pairs = Counter()
            for word in words:
                for i in range(len(word) - 1):
                    pairs[(word[i], word[i + 1])] += 1
            most_common = pairs.most_common(1)[0]
            merger_rules[most_common[0]] = mergers

            for i in range(len(words)):
                j = 0
                while j < len(words[i]) - 1:
                    if (words[i][j], words[i][j + 1]) == most_common[0]:
                        words[i] = (
                            words[i][:j]
                            + ["".join(most_common[0])]
                            + words[i][j + 2 :]
                        )
                    j += 1
            mergers += 1

        processed_words = []
        for w in words:
            processed_words.append(w)
            if w in [".", "!", "?"]:
                processed_words.append("EOS")

        self.vocab = np.unique(np.concatenate(words)).tolist()
        self.vocab.append("UNK")
        self.vocab.append(" ")
        if "EOS" not in self.vocab:
            self.vocab.append("EOS")

        self.merger_rules = merger_rules

        self.word_to_index = {word: i + 1 for i, word in enumerate(self.vocab)}
        self.index_to_word = {i + 1: word for i, word in enumerate(self.vocab)}

        codified = []
        for i, word in enumerate(processed_words):
            for subword in word:
                if subword in [".", "!", "?"]:
                    if len(codified) > 0 and codified[-1] == " ":
                        codified.pop()  # only remove a space
                    codified.append(subword)
                    codified.append("EOS")
                elif subword in self.vocab:
                    codified.append(subword)
                else:
                    codified.append("UNK")
            if i < len(processed_words) - 1:
                codified.append(" ")

        counter = Counter(codified)
        self.freqs = torch.tensor(
            [counter.get(word, 0) for word in self.vocab], dtype=torch.float
        )

    def codify(self, line):
        line = line.strip()
        words = re.findall(r"\w+|[^\w\s]", line)
        tokenized = [list(word) for word in words]

        for i in range(len(tokenized)):
            j = 0
            while j < len(tokenized[i]) - 1:
                pair = (tokenized[i][j], tokenized[i][j + 1])
                if pair in self.merger_rules:
                    tokenized[i] = (
                        tokenized[i][:j]
                        + ["".join(pair)]
                        + tokenized[i][j + 2 :]
                    )
                    j = 0
                else:
                    j += 1

        codified = []
        for i, word in enumerate(tokenized):
            for subword in word:
                if subword in [".", "!", "?"]:
                    if len(codified) > 0 and codified[-1] == " ":
                        codified.pop()
                    codified.append(subword)
                    codified.append("EOS")
                elif subword in self.vocab:
                    codified.append(subword)
                else:
                    codified.append("UNK")
            if i < len(tokenized) - 1:
                codified.append(" ")

        indices = torch.tensor(
            [
                self.word_to_index.get(tok, self.word_to_index["UNK"])
                for tok in codified
            ]
        )

        return indices
```
