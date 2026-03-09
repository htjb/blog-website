---
type: post
date: 09/03/2026
tags: statistics, foregrounds
---

# Quadratic Programming

Quadratic programming is the process of optimizing a quadratic function subject to linear constraints. Here when we say linear and quadratic we mean linear and quadratic in the parameters to be optimized. Mathetmatically we write

$$\mathrm{minimize}~~ \frac{1}{2}\mathbf{x}^T Q \mathbf{x} + \mathbf{c}^T \mathbf{x}$$
$$\mathrm{subject~to}~~A\mathbf{x} \leq b$$

where $\mathbf{c}$ is a real valued n-dimensional vector, $Q$ is a $n \times n$ sysmmetric real matrix, $A$ is a $m \times n$ dimensional real matrix, $b$ is an m dimensional vector and $\mathbf{x}$ is a $n$ dimensional vector to be optimized for. The notation $A\mathbf{x} \leq \mathbf{b}$ means that every entry in $A\mathbf{x}$ is less than the corresponding entry in $\mathbf{b}$.

**Note:** *Programming here refers to a procedure for solving mathematical problems not the more modern term computer programming.*

## Why am I interested?

One of the main challenges in 21-cm cosmology is to separate out the 21-cm signal from the Galactic and extragalactic foregrounds. The foregrounds are typically 4 to 5 orders of magnitude larger than the signal and made up of synchrotron and free-free emission. I wrote a previously wrote a post discussing this which you can read [here](https://harrybevins.co.uk/post.html#21cmforegrounds).

This foreground $T_{fg}$ is often modelled with a polynomial function. For example

$$T_{fg} = \sum_{i=0}^{N} a_i \bigg( \frac{\nu}{\nu_0} \bigg)^i$$

where $a_i$ are the coefficients of the model, $\nu$ is frequency and $\nu_0$ is some reference frequency.

The issue is that polynomials are incredibly flexible and can potentially fit out the 21-cm signal alongside the foregrounds.

In 2015 Mayuri Sathyanarayana Rao and collaborators introduced maximally smooth functions in two papers focused on [spectral ripples from the Recombination Epoch](https://arxiv.org/abs/1501.07191) and [21-cm Cosmology](https://arxiv.org/abs/1611.04602).

The idea behind maximally smooth functions is to model the foreground using a polynomial but constrain derivatives with order greater than 2 so that they don't cross zero. Mathematically we would write this constraint as

$$\frac{d^m T_{\rm MSF}}{d\nu^m} \leq 0\ \mathrm{or}\ \frac{d^m T_{\rm MSF}}{d\nu^m} \geq 0\ \mathrm{for}\ m \in \lbrace 2, 3, \dots, N\rbrace$$

This constraint prevents inflection points in the model and higher order non-smooth structure. As a result the models better reflect the smooth synchrotron and free-free emission in the data.

In 2021 I wrote the *maxsmooth* python package to fit maximally smooth functions using quadratic programming. In the corresponding [paper](https://arxiv.org/abs/2007.14970) I wrote a description of how we can phrase the polynomial model and constraint in the language of quadratic programming and then proceeded to show that we can rapidly solve for the coefficients of the polynomial $a$ using the quadratic programming package [CVXOPT](https://cvxopt.org/).

At the time I was mainly interested in applying *maxsmooth* to observations of the 21-cm signal and satisfied myself with a surface level understanding of quadratic programming. However, I have recently been trying to rewrite *maxsmooth* in JAX (see this [branch](https://github.com/htjb/maxsmooth/tree/v2-jax)) for improved run times and better integration with JAX native sampling algorithms like [blackjax](https://github.com/blackjax-devs/blackjax). It turns out CVXOPT is very well optimized and even using modern tools like JAX it is hard to write something faster! 

In the process of trying to optimze *maxsmooth* however I have dug deeper into how CVXOPT works and how we solve quadratic programs.

## How do we solve them?

There are a few different methods for solving quadratic programming problems. Two commonly encountered approaches are Alternating Direction Method of Multipliers and the Interior Point Method (this is the one used by CVXOPT as far as I can tell). I will review the two methods below, make a comparison and then discuss how we implement them in JAX.

### Alternating Direction Method of Multipliers

ADMM...

### Interior Point Method

## A comparison of solvers

## qpj
