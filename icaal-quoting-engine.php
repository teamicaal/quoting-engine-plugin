<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              http://www.icaal.co.uk
 * @since             1.0.0
 * @package           Icaal_Quoting_Engine
 *
 * @wordpress-plugin
 * Plugin Name:       ICAAL Quoting Engine
 * Plugin URI:        http://www.icaal.co.uk/quoting-engine/
 * Description:       Embed the ICAAL Quoting Engine within your site 
 * Version:           1.1.0
 * Author:            ICAAL
 * Author URI:        https://www.icaal.co.uk
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       icaal-quoting-engine
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-icaal-quoting-engine-activator.php
 */
function activate_icaal_quoting_engine() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-icaal-quoting-engine-activator.php';
	Icaal_Quoting_Engine_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-icaal-quoting-engine-deactivator.php
 */
function deactivate_icaal_quoting_engine() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-icaal-quoting-engine-deactivator.php';
	Icaal_Quoting_Engine_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_icaal_quoting_engine' );
register_deactivation_hook( __FILE__, 'deactivate_icaal_quoting_engine' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-icaal-quoting-engine.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_icaal_quoting_engine() {

	$plugin = new Icaal_Quoting_Engine();
	$plugin->run();

}
run_icaal_quoting_engine();
