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

As part of the workshop I ran a discussion session on data analysis and applicaitons of machine learning in the field. 

I discussed the relationship between the all sky measurements we are making and existing models of the radio sky like GSM. This was motivated by an earlier talk in the day from the GINAN collaboration who have found that their data disagrees with the predicted magnitude of the radio monopole from GMS by about 20%. This is consistent with results from other experiments and there are known issues with the maps that make up GSM but in practice the true value of the monopole may be somewhere between the measurements from global signal experiments and the maps that make up GSM.

I also asked about whether we were confident that our theoretical models are correct or do we think that we are still missing some important effects. We often do not account for uncertainties in our modelling when we perform our analysis and there are many theoretical models that are all parameterised slightly differently. There have been suggestions in the past that a code comparison could be performed to get a better handle on the differences and this could help inform theoretical uncertainties.

Finally, I talked about AI and the advent of GPU computing. I asked about the possibilities of using agentic ai for 21-cm cosmology and we discussed a number of potential applications including antenna design and signal emulator design. I also asked if people were using LLMs in their day to day research and how we felt about the potential impact it will have on students going forward.

<center><img src="./posts/images/global_workshop.png" alt-text="Leading the discussion  session" width="50%"></center>

## Highlighted Talks

There were many exciting talks at the conference and the field has made a lot of progress in recent years particularly in diversifying the landscape of instruments that are being used and in developing analysis tools. I've highlighted two exciting contributions below.

### BayesLIM - Nick Kern

Nick Kern introduced his [BayesLIM](https://github.com/BayesLIM/BayesLIM) package to the field. This is a full end-to-end simulation framework for line intensity mapping and 21-cm cosmology. The thing that excites me about this project is that it is written in PyTorch, can therefore be run on GPUs and you can take gradients across the model allowing for efficient inference with frameworks like BlackJAX and GPU compatible implementations of algorithms like HMC. The code isn't yet set up for sky-averaged 21-cm cosmology and there is no integrated GPU model of the 21-cm signal but I am excited to see where it goes!

### EIGSEP progress - Aaron Parsons, Christian Hellum Bye, Bahram Khalichi, Dominic Vazquez, Charlie Tolley

The EIGSEP team gave several updates on their progress. EIGESP is a proposal to hang an antenna in a canyon in order to get away from the soil which causes issues for sky-averaged instruments operating at low frequencies between 50-200 MHz. The team discussed recent deployments where their new bow tie antenna (previously the collaboration had been using a Vivaldi feed) had been suspended in a canyon 100 m above the ground. The idea is that the antenna is sufficiently high that the canyon floor and walls are in the far field and do not impact the response of the antenna to the sky (known as the beam pattern). Of course the horizon is very close however and the field of view is narrowed. The team explained how they could rotate their antenna around when it was suspended and make measurements of its beam pattern in situ helping them better understand the response of the telescope.