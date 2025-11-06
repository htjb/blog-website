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

Bag-of-Words or BoW is probably the simplest tokenisation algorithm. The idea is basically to look for unique whole words and punctuation marks in the corpus, count how many times they appear and rank them based on their frequency. In the phrase "I am well thank you! I wanted to talk to you." the words "I", "you" and "to" all appear twice and the other words only once so our vocabulary might look like `vocab = {1: "I", 2: "you", 3: "to", 4: "am", 5: "well", 6: "thank", 7: "!", 8: "wanted", 9: "talk", 10: ".", 11: " "}`. The corresponding codified phrase in our training data would be `[1, 11, 4, 11, 5, 11, 6, 11, 2, 7, 11, 1, 11, 8, 11, 3, 11, 9, 11, 3, 11, 2, 10]`.

The observant reader will notice that the `" "` is coded as the 11th most frequent character in the data. Of course, it is actually the most frequent! During BoW and other tokenisation algorithms, however, the data is usually split based on spaces. So the `" "` is added into the vocabulary after we have looked through the training data for unique tokens. We also usually add an `"UNK"` token so that our model can react when it sees something that is not in its vocabulary, and we will add an `"EOS"` token after sentence ending punctuation. The `"EOS"` token helps our model identify when a sentence or phrase has ended and helps when we are making predictions to form coherent answers. We might also add a `"PAD"` token...

## Byte Pair Encoding

In the Bag of Words model we treat each unique word in our corpus as a token however this limits the expressivity of our network to that specific set of words. If our network sees a word that it has not previously encountered there will be no mapping in our vocabulary for it and no way for it to understand its context. This approach is fine if we have a large enough and diverse enough corpus, but it is not ideal.

An alternative approach is to tokenise our corpus using subwords.

## Other considerations

size of the corpus used to build the vocab.
Spaces and EOS and padding
Unkown tokens

We want our training data to 

```python
def clean_non_latin(text):
    # 1. Decompose accents so é → e + ́
    nfkd = unicodedata.normalize("NFKD", text)
    # 2. Remove combining marks (accents)
    no_accents = "".join(c for c in nfkd if not unicodedata.combining(c))
    # 3. Keep only characters you want:
    #    - ASCII letters/numbers
    #    - basic punctuation/math (common Unicode math symbols)
    allowed = re.sub(
        r"[^A-Za-z0-9\s\.,;:\-\+\*/=<>\(\)\[\]\{\}~!@#\$%\^&\|\\\?\^\_]",
        "",
        no_accents,
    )
    return allowed
```
