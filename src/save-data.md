---
subtitle: Save-Data
---
Opt-out of web fonts when the [Save-Data header](https://web.dev/optimizing-content-efficiency-save-data/) is present. You can use a [web extension to enable this on your development machine](https://www.daniel.priv.no/web-extensions/save-data.html).

* Zero client-side JavaScript required. Disable JavaScript and watch the nice heading web fonts disappear.
* Sample benchmarks (at time of writing):
	* `9.1 kB` with `Save-Data` on
	* `18.1 kB` for a full page load with web fonts (yes I’ve optimized this quite a bit already, but you can apply it to anything)
---

### Source Code

<a href="https://www.11ty.dev/docs/plugins/edge/">Learn more on 11ty.dev: Eleventy Edge Plugin documentation</a>

#### 

{% highlight html %}
<head>
	<!-- … -->
	{% edge "liquid" %}
	{% if eleventy.edge.saveData == false %}
		<link rel="preload" href="/static/BenchNine-Bold-subset.woff2" as="font" type="font/woff2" crossorigin>
		<style>
		@font-face {
			font-family: BenchNine;
			src: url("/static/BenchNine-Bold-subset.woff2") format("woff2");
			font-weight: 700;
			font-display: swap;
			unicode-range: U+21,U+28,U+29,U+2D-3A,U+3F,U+41-5A,U+5F,U+61-7A;
		}
		</style>
	{% endif %}
	{% endedge %}
	<!-- … -->
</head>
{% endhighlight %}

Check out the [`unicode-range` value on Uniclode](https://uniclode.zachleat.dev/_21x28x29x2D-3Ax3Fx41-5Ax5Fx61-7A/).