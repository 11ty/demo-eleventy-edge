---
subtitle: Critical CSS
---
Critical CSS rendered on the edge for empty-cache visits and further optimized for repeat views with a full cache.

* Zero client-side JavaScript required. Disable JavaScript and try it out!
* On first page view, the stylesheet is inlined in a `<style>` on the `<head>` for critical path speed without remote asset requests. The same stylesheet is also requested asynchronously with **Lowest priority** to prime the cache for repeat views.
* On subsequent views, the cached-URL stylesheet is linked as a **Highest priority** stylesheet request.
* Learn more about [Prioritizing resources on web.dev](https://web.dev/prioritize-resources/).

{% edge %}
{%- if eleventy.edge.cookies.repeat %}
## Welcome back!

You are a full-cache repeat visitor.

For testing: [Reload this page]({{ eleventy.edge.path }}). [Reset the cookie](/?repeat-reset).

Check the network tab on your browser’s devtools (make sure the Disable cache preference is not checked). You received a **highest priority** `<link rel="stylesheet" href="/static/style.css">` on a primed browser cache.
{%- else %}
## Are you new here??

You are a empty-cache first-time visitor.

For testing: [Reload this page]({{ eleventy.edge.path }}).

Check the network tab on your browser’s devtools (make sure the Disable cache preference is not checked). You received a `<style>` block and a **lowest priority** `<link rel="stylesheet" media="print" href="/static/style.css">` request for repeat views. Add `onload="this.media='all'"` if you want to apply your asynchronous stylesheet immediately (e.g. it contains CSS for below-the-fold components).
{%- endif %}
{% endedge %}

---

<p><a href="https://www.11ty.dev/docs/plugins/edge/">Learn more on 11ty.dev: Eleventy Edge Plugin documentation</a></p>

### Source Code

#### Loader code in _includes/layout.liquid

{% highlight html %}
<head>
  <!-- … -->
  {%- capture criticalCss %}
    {% include "css/style.css" %}
    {% include "css/theme.css" %}
    {% include "css/form-autosubmit.css" %}
  {% endcapture %}

  {% edge "liquid" criticalCss %}
    {% if eleventy.edge.cookies.repeat %}
    <link rel="stylesheet" href="/static/style.css">
    {% else %}
    <style>{{ _ }}</style>
    <link rel="stylesheet" href="/static/style.css" media="print" onload="this.media='all'">
    {% endif %}
  {% endedge %}
  <!-- … -->
</head>
{% endhighlight %}

### Improvements:

* Use `fetchpriority="low"` instead of the media toggle method (`media="print" onload="this.media='all'"`) to improve empty-cache no-JavaScript experience. At time of writing, [browser support is limited](https://caniuse.com/mdn-html_elements_link_fetchpriority).

#### Edge Function

Sets the cookie to track repeat views and the ?repeat-reset query param to delete the cookie.

* [./netlify/edge-functions/repeat.js](https://github.com/11ty/demo-eleventy-edge/blob/main/netlify/edge-functions/repeat.js)