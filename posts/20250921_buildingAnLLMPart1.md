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

and I will break these down into smaller blog posts. As part of this project I also wanted to build a javascript+html+css frontend and package my model up with something like ONNX. I have very little experience with javascript+html+css and I thought this was fun opportunity to practice. The actual model will be written in pytorch.

