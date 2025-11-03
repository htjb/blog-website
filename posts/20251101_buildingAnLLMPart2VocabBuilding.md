---
type: post
date: 01/11/2025
tags: llms, machine learning
---

# Building a Large Language Model: Part 2

In the [previous post](https://harrybevins.co.uk/#post-building-a-large-language-model-part-1) in this series, I introduced my ambitious project to build a language model with PyTorch and a JavaScript frontend. I discussed the need for large corpuses of training data and demonstrated how we could download articles scraped from [wikipedia](https://www.wikipedia.org/) using the `huggingface` datasets library.

In this post I will discuss how we turn this data into something that is `readable` by the neural network through tokenisation. I'll introduce two different methods to tokenise our data and explain some other more nuanced considerations we have to make, but first I will try and explain what tokenisation actually is.

## Tokenisation and Vocab Building

In order to build a language model we need a way to encode words or parts of words and punctuation into numerical values. This mapping has to be deterministic so that the network can learn patterns, and we can decode its predictions. We call this mapping a vocabulary, and we call the objects in our vocabulary tokens. 

Tokens can be either full words or parts of words and punctuation. 

Imagine we have a sentence along the lines of "The weather today is cloudy and rainy".

```python
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
```

## Bag of Words

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
