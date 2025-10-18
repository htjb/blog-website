# Codes

You can checkout my codes on [github](https://github.com/htjb).

## Maintainer/Developer

### SLiM: Small Language Model

The idea behind SLiM was to build a small transformer based language model to better understand how they work. It's still under development, but you can take a look at the [code](https://github.com/htjb/small-language-model). The models are being built and developed using PyTorch and packaged with ONNX and there is a frontend similar to ChatGPTs using javascript, html and css (although none of my attempts to train a model that can return coherent text have so far succeeded!).

### globalemu: neural network emulation for 21-cm cosmology

[globalemu](https://github.com/htjb/globalemu) is a simple feed-forward neural network emulator of the sky-averaged 21-cm signal. The emulator takes the novel approach of putting the independent variable, redshift or frequency, into the network alongside the physical parameters of the model and returning a single corresponding value of the sky-averaged 21-cm signal. Vectorized calls can them be used to evaluate the signal over a range of frequencies. The approach prevents the need for lossy PCA compressions of the data, allows the network to learn redshift dependence and was 100x faster and twice as accurate as the previous state of the art. It is written in TensorFlow and is now widely used for inference on sky-averaged 21-cm datasets. It is an integral part of the REACH data analysis pipeline and the novel approach was adapted for observations of the power spectrum by the HERA collaboration.

### margarine: marginal statistics and novel priors with normalising flows

[margarine](https://github.com/htjb/margarine) uses an implementation of Masked Autoregressive Flows in TensorFlow to achieve several goals; calculation of marginal Bayesian statistics, accurate likelihood emulation from samples and modelling of novel priors from samples. The core idea is to take samples from inference chains and marginalise over nuisance parameters by training normalising flows on specific sub sets. This allows you to calculate marginal Kullback-Liebler divergences for example and compare the constraining power of say Planck compared to DES on the $\Lambda$CDM cosmological model while marginalising over contributions from their specific nuisance parameters. You can also learn marginalised and properly normalised likelihoods or define priors from samples using this tool.

### maxsmooth: constrained polynomial fitting

This [code](https://github.com/htjb/maxsmooth) uses quadratic programming to fit polynomials subject to the constraint that certain derivatives of the function do not cross zero. The code was originally designed to model the smooth synchrotron and free-free emission observed by sky-averaged 21-cm experiments and has been used to analyse data from EDGES and LEDA. An updated version of this code written in JAX is in development.

## Contributions

### anesthetic: visualisation and post-processing of inference chains

[anesthetic](https://github.com/handley-lab/anesthetic) is a code used to post-process and visualise Bayesian inference chains. I added a [feature](https://github.com/handley-lab/anesthetic/pull/145) to plot confidence intervals under 1D posterior plots.