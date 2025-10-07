---
type: post
date: 07/10/2025
tags: 21cm, conferences
---

# Global 21-cm Workshop, Caltech

I recently attended the [8th Global 21-cm workshop](https://sites.google.com/asu.edu/8g21cmworkshop) at Caltech in the US with colleagues from Cambridge. The annual workshop brings researchers working on the detection of and theoretical modelling of the sky-averaged 21-cm signal together to discuss the latest updates and results in the field. 

As a member of the Scientific Organising Committee I helped organise the scientific program for the conference. This year we heard about the latest neural network emulators for the 21-cm signal, the recent deployment of EDGES on Adark island, progress with the deployable MIST instrument and the EIGSEP instrument which is designed to hang suspended in a canyon. We also had updates from a few instruments attempting to detect the power spectrum including HERA and OVRO-LWA.

I spoke on my recent [paper](https://arxiv.org/abs/2503.13263) investigating how the accuracy of emulators can impact our recovered posteriors in Bayesian inference and chaired a discussion on machine learning and data analysis techniques. There are some more details below and some highlights from the conference.

REACH are hosting the conference next year at the University of Malta.

## Posterior Recovery with Neural Networks

I presented some recent [work](https://arxiv.org/abs/2503.13263) in which myself and colleagues derived an upper limit on the information loss incurred when using neural network emulators in Bayesian inference pipelines. Emulators are crucial for 21-cm cosmology and allow researchers to fit physically motivated semi-numerical simulations to observations. Typically, these semi-numerical simulations take several hours to evaluate per parameter set, and the models have to be called millions of times during inference. To get around this issue we use emulators trained on a few thousand simulations which can generally be evaluated in milliseconds. Emulators generally speaking taking the parameters of the model and output the 21-cm signal.

However, the models predicted by an emulator are approximations to the outputs of the semi-numerical simulations. We generally measure the error in the predictions with something like a root mean squared error but rarely think about how it impacts our recovered posteriors. In practice this error propagates to the likelihood function $L = P(D|\theta, M)$ and consequently the posterior $P = P(\theta| D, M)$
$$P = \frac{L \pi}{Z},$$
where $\theta$ are the model parameters, $M$ is the semi-numerical simulation or emulated approximation, $\pi$ is the prior on our model parameters and $Z$ is the Bayesian evidence. 

If we denote the true model as $M$ and the emulated model as $M_E$ then we want to know how the error between $M$ and $M_E$ effects our recovery of $P$. If our recovered posterior is denoted as $P_E$ then a useful way to quantify the difference between $P$ and $P_E$ is with a Kullback-Leibler divergence 
$$D(P||P_E) = \int P(\theta|D, M)\log \bigg(\frac{P(\theta|D, M)}{P_E(\theta|D, M_E)}\bigg) d\theta.$$
Unfortunately we don't have access to $P$ since we cannot perform inference directly on the semi-numerical simulation otherwise we wouldn't be interested in emulators!

Fortunately, we can place an upper limit on $D(P||P_E)$ if we make some assumptions about the functional form of our likelihoods, the noise in our data and effectively take a Laplace approximation around the peak of the posterior. In the paper we showed that
$$D(P||P_E) \leq \frac{N_d}{2}\bigg(\frac{\mathrm{RMSE}}{\sigma}\bigg)^2,$$
where $N_d$ is the numebr of data points, RMSE is the root mean squared error of the emualtor across some test data set and $\sigma$ is the standard deviation of the noise in the data (assuming uncorrelated gaussian noise).

You can see my slides from the conference [here](https://github.com/htjb/Talks/blob/master/Talks/global-workshop-2025/bevins-posterior-recovery.pdf).

## Discussion

<center><img src="./posts/images/global_workshop.png" alt-text="Leading the discussion  session" width="50%"></center>

## Highlighted Talks

### BayesLIM - Nick Kern

### 21-cm Cosmology from the ground and space - Eloy de Lera Acedo

### EIGSEP progress