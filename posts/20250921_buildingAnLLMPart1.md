---
type: post
date: 21/09/2025
tags: llms, machine learning
---

# Building a Large Language Model: Part 1

Large language models are now widely used for a variety of different tasks. To try and gain a better understanding of how they work I have been attempting to train my own language model. I don't expect to be able to train something as powerful as chatGPT, Gemini or Claude, but I am hoping that I can build a toy model that is capable of producing some coherent text. My goal is really to build a *small* language model.

There are a number of different steps when building a language model
- building a training data set
- building a vocabulary
- designing a neural network architecture
- training and testing

and I will break these down into smaller blog posts. As part of this project I also wanted to build a javascript+html+css frontend and package my model up with something like ONNX. I have very little experience with javascript+html+css and I thought this was fun opportunity to practice. The actual model will be written in pytorch. I have already made quite significant progress towards a toy language model and will try to recap and summarise what I have learnt. 

The code can be found on my github [here](https://github.com/htjb/small-language-model).

I'll start by talking about the training data.

## Building a training data set

In order to build a large language model we need a large corpus of text to train on. Due to copyright issues this text has to be in the public domain. There are a few different options and I initially looked at use free ebooks from [Project Gutenberg](https://www.gutenberg.org/). 

The Project Gutenberg repository contains around 75,000 ebooks all available for free. I think that they have an API that you can use to download large numbers of books and there are a few python packages available to help. However, I initially just copied the plain text files for a few books manually from the website. This was before I realised just how much text data I needed to train an LLM. I downloaded about 15 books and used these to set up my tokenization and test out my training, but it eventually became apparent that I need much more data.

As I say I could have probably scraped the Project Gutenberg website and downloaded lots and lots of books. However, I did a bit of reading and discovered that you can easily download Wikipedia and decided to have a go at this instead. 

I used the huggingface datasets package to download a simple english wikipedia dump from 
the 1st November 2023. The code is shown below. In this example I am restricting myself to 10,000 articles but there are 241,787 in total.

```python
from datasets import load_dataset
from tqdm import tqdm

# This grabs the 20231101 Simple English dump
wiki = load_dataset("wikimedia/wikipedia", "20231101.simple", split=None)[
    "train"
]

pbar = tqdm(wiki, desc="Processing articles")
for i, example in enumerate(pbar):
    with open(f"wiki_{i}.txt", "w", encoding="utf-8") as f:
        f.write(example["text"])
    if i >= 10000:
        break
```

The datasets can be found [here](https://huggingface.co/datasets/wikimedia/wikipedia). The first few lines of an example article are shown below.

```
April (Apr.) is the fourth month of the year in the Julian and Gregorian calendars, and comes between March and May. It is one of the four months to have 30 days.

April always begins on the same day of the week as July, and additionally, January in leap years. April always ends on the same day of the week as December.

The Month 

April comes between March and May, making it the fourth month of the year. It also comes first in the year out of the four months that have 30 days, as June, September and November are later in the year.
```

In the next blog post I'll talk about how we take these articles and tokenize them for training. Tokenization is the process of turning raw text into smaller units—tokens—that a model can understand. These tokens might be words, subwords, or even single characters, depending on the tokenizer. Each token is then mapped to an integer ID so the model sees a sequence of numbers instead of plain text.