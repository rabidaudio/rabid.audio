---
title:      Android Interfaces
subtitle:   Anonymous "Callbacks" (kinda) in Java
date:       2014-8-13 12:46:00 -0500
layout:     blogspot_post
categories:
- software
---

I came to Android development after doing a lot of JavaScript (and falling in love with the callback methodology),
so there are a lot of Java's form of callbacks (that is, interfaces). If you aren't familiar with the way this is
done in Java, here is a little example:

{% highlight java %}
    interface MyCallbacks {
        public void onSomeEvent();
        public void onAnotherEvent(int data);
    }

    class SomeClassThatDoesStuff {
        MyCallbacks callbacks;
        SomeClassThatDoesStuff(MyCallbacks callbacks) {
            this.callbacks = callbacks;
        }
       
        public void doStuffAsynchronously(){
            //do stuff
            callbacks.onSomeEvent();
        }
        public void doOtherStuffAsynchronously(){
            //do stuff
            callbacks.onAnotherEvent(0);
        }
    }
{% endhighlight %}

Then, somewhere where you use `SomeClassThatDoesStuff`, you can construct it by passing in an instance of
something that inherits `MyCallbacks`. This could be an anonymous interface (like anonymous callbacks in JavaScript):
 
{% highlight java %} 
SomeClassThatDoesStuff c = new SomeClassThatDoesStuff(new MyCallbacks() {
    @Override
    public void onSomeEvent() {
        //do stuff
    }

    @Override
    public void onAnotherEvent(int data) {
        //do stuff
    }
});
{% endhighlight %}
 
This is conceptually identical to what is below, but it doesn't make a new class for something you will use exactly once.

{% highlight java %} 
class MyCallbacksInstance implements MyCallbacks {
    @Override
    public void onSomeEvent() {
        //do stuff
    }

    @Override
    public void onAnotherEvent(int data) {
        //do stuff
    }
}
SomeClassThatDoesStuff c = new SomeClassThatDoesStuff(new MyCallbacksInstance());
{% endhighlight %}
 
However, the anonymous callbacks can get a little confusing, so instead we implement the callbacks directly in the object
which uses `SomeClassThatDoesStuff`:

{% highlight java %} 
class MainClass implements MyCallbacks{
   
    //other class stuff (constructors, other methods...)

   
    @Override
    public void onSomeEvent() {
        //do stuff
    }

    @Override
    public void onAnotherEvent(int data) {
        //do stuff
    }
}
{% endhighlight %}
 
Then, when making an instance of `SomeClassThatDoesStuff`, we pass in this (the current object instance instead):

    SomeClassThatDoesStuff c = new SomeClassThatDoesStuff(this);

Now when we call `c.doStuffAsynchronously();` we know that our method `onSomeEvent()` will be called when it is done.
 
This pattern is very common in Android development.  It totally confused me when I first saw it, until it was broken out into these three steps first. Then suddenly the skies cleared and a whole world of Java I had never seen before became available.