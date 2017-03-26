Chinese Input Method Editor (IME)
===========

A JavaScript jQuery plugin for building Chinese keyboard input capabilities natively into a website.

Introduction
-----------

This Chinese IME is a JavaScript jQuery plugin that allows you to easily build the ability to type in Chinese characters into your website. The target users here are probably not native Chinese speakers who are very familiar with Chinese input methods, but rather those learning Chinese as a second language. Someone new to the language might not yet have installed an IME onto their OS, or might not yet know how to use it. If that sounds like your main audience, this is for you. This plugin is easy and intuitive to use for beginners and experts alike, and doesn't interfere with built-in OS input methods.

Features
-----------

 - Written in JavaScript as a jQuery plugin
 - Can be added to any `textarea` or `input`
 - Supports both simplified and traditional input methods
 - Smaller than 20kB, super fast
 - Completely stylable through CSS
 - Designed to be as unobtrusive as possible
 - Doesn't interfere with OS-builtin input methods
 - A range of different settings that can be passed as parameters
 - Licensed under the Lesser General Public Licence (LGPL), which means you can use it in any sort of project, commercial or otherwise, redistribute it and change it any way you want, as long as you retain the original copyright notice and keep that part of the code under the same LGPL license (so you can link to it from a commercial closed-source project, no problem)
 - Backend suggestions can be powered either by Google Translate or your own custom service, it's up to you. Google doesn't have an official API for this, so at least attribution would be advised if you go that route. However, I am not a lawyer. If you want to be 100% safe, write your own backend or hound me until I do.
 - Caches answers from the backend, increasing efficiency and reducing calls.

Demo
-----------

There is also a demo included in this package in the `demo` folder.

Tested in
-----------

I've so far tested this in Chrome (Chromium v.18) and Firefox 13+, where all works as expected. I don't really have a test suite available right now, so if anyone could contribute further test results, that would be great!

Authors
-----------
 - Herman Schaaf (herman [ at ] ironzebra [ 。] com)
