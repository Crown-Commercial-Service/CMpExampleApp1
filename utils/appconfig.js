/**
 * This simple class represents the Application configuration.
 * 
 * The following environment variables are supported:
 * 
 * CCS_API_BASE_URL
 *      Base URL for API access with no protocol or trailing /
 * CCS_API_PROTOCOL
 *      API protocol, 'http' or 'https'
 * CCS_APP_BASE_URL
 *      Base URL for APP access with no protocol or trailing /
 * CCS_APP_PROTOCOL
 *      APP protocol, 'http' or 'https'
 * 
 * Features swtiches can also be specified with the prefx CCS_FEATURE_
 * The value must be 'on', 'off', 'enabled', 'disabled', 'true' or 'false', 'yes' or 'no'.
 * 
 *      For example: CCS_FEATURE_EG1=on
 */
class AppConfig {

    /**
     * Create new application config
     */
    constructor(){

        this.ENV_API_BASE_URL = "CCS_API_BASE_URL";
        this.ENV_API_PROTOCOL = "CCS_API_PROTOCOL";
        this.ENV_APP_BASE_URL = "CCS_APP_BASE_URL";
        this.ENV_APP_PROTOCOL = "CCS_APP_PROTOCOL";
        this.ENV_FEATURE_PREFIX = "CCS_FEATURE_";
    
        // Set defaults
        this.appProtocol = "http";
        this.appBaseURL = "roweitdev.co.uk";
        this.apiProtocol = "http";
        this.apiBaseURL = "ccsdev-internal.org";

        // Map of available features
        this.featureInfo = {};

        // Read what we can from the environment
        for ( let ev in process.env ) {
            let evTest = ev.toUpperCase().trim();
            if ( evTest === this.ENV_API_BASE_URL ) {
                this.apiBaseURL = process.env[ev].trim();
            } else if ( evTest === this.ENV_API_PROTOCOL ) {
                this.apiProtocol = process.env[ev].trim();
            } else if ( evTest === this.ENV_APP_BASE_URL ) {
                this.appBaseURL = process.env[ev].trim();
            } else if ( evTest === this.ENV_APP_PROTOCOL ) {
                this.appProtocol = process.env[ev].trim();
            } else if ( evTest.startsWith(this.ENV_FEATURE_PREFIX) ) {
                console.log( evTest );

                // Extract feature name and determine if its enabled or not
                let featureName = evTest.substr( this.ENV_FEATURE_PREFIX.length );
                let enabled = false;
                let val = process.env[ev].toUpperCase().trim();
                if ( (val === "ON") || (val === "TRUE") || (val === "YES") || (val === "ENABLED") ) {
                    enabled = true;
                }
                this.featureInfo[featureName] = enabled;
            }
        }
        
        // Summary of settings
        console.log( "CCS_API_BASE_URL = [" + this.apiBaseURL + "]" );
        console.log( "CCS_API_PROTOCOL = [" + this.apiProtocol + "]" );
        console.log( "CCS_APP_BASE_URL = [" + this.appBaseURL + "]" );
        console.log( "CCS_APP_PROTOCOL = [" + this.appProtocol + "]" );
        console.log( "FEATURES = ", this.featureInfo );
    
    };

    /**
     * Obtain the UL to access a specific APi
     * @param {*} apiName 
     */
    getApiURL( apiName ) {

        return this.apiProtocol + "://" + apiName + "." + this.apiBaseURL;
    };
    
    /**
     * Indicates if a particular feature is enabled
     * @param {*} featureName 
     */
    isFeatureEnabled( featureName ) {
    
        return this.featureInfo[featureName.toUpperCase().trim()] ? true : false;
    };
    
        
}

module.exports = AppConfig;
