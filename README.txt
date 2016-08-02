=== ICAAL Quoting Engine ===
Contributors: ashdotguru
Donate link: http://www.icaal.co.uk
Tags: ICAAL, Internet Consultants and Associates, ICAAL Quoting Engine, Quoting Engine, Double Glazing Quote
Requires at least: 4.5
Tested up to: 4.5
Stable tag: 1.0.3
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Embed the ICAAL Quoting Engine within your site 

== Description ==

This plugin will embed the ICAAL Quoting Engine within a popup on your site globally. You will be able to open and close the popup using buttons.

You also have the option to display a redirect notice on small devices so that the quoting engine will open in a new tab.

== Installation ==

= Install the plugin using the following steps =

1. Upload the `quoting-engine-plugin` folder to the `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Create buttons throughout the website with the following attributes `data-toggle="quoting-engine"` and `data-iframe="{url}"` swapping `{url}` with the quoting engine URL
4. The quoting engine will automatically open in a new tab on devices `<768px` wide. To change the redirect width you can add the following attribute `data-redirect-width="768"`

== Changelog ==

= 1.0.3 =

= Improvements =
* **Easier integration** - Quoting engine will automatically open in new tab on devices `<768px`

= Bugfixes =
* **Quoting engine resizing** - Changed the iframe ID as it was conflicting with pre existing engines

Release Date: August 2st, 2016

= 1.0.2 =

= Improvements =
* **Better usability** - Allow `<a>` tags to trigger the popup

Release Date: August 1st, 2016 

= 1.0.1 =

= Improvements =
* **Remove redirect modal** - if device is too small it will open the quoting engine in a new tab
* **Better usability** - If the `data-redirect-width` attribute is null it will always load the popup

Release Date: August 1st, 2016 

= 1.0.0 =

Release Date: August 1st, 2016 