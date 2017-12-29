// src/methods
const { actions, httpMethods } = require('./constants');
const { DELETE, GET, POST, PUT } = httpMethods;
const {
  POWEROFF,
  PUBLISH_UPDATES,
  REDEPLOY,
  REPAIR,
  RESET_DISKS,
  RESTART,
  SHUTDOWN,
  START,
  STOP,
} = actions;

// Alerts
module.exports.getAlerts = {
  method: GET,
  path:   '/userAlerts',
};

module.exports.subscribeAlert = {
  method: POST,
  path:   '/userAlerts',
};

module.exports.unsubscribeAlert = {
  method: DELETE,
  path:   (alertId) => `/userAlerts/${alertId}`,
};

// Applications
module.exports.createApplication = {
  method: POST,
  path:   '/applications',
};

module.exports.createApplicationDocumentation = {
  method: POST,
  path:   (appId) => `/applications/${appId}/documentation`,
};

module.exports.createApplicationTask = {
  method: POST,
  path:   (appId) => `/applications/${appId}/tasks`,
};

module.exports.deleteAllApplicationTasks = {
  method: DELETE,
  path:   (appId) => `/applications/${appId}/tasks`,
};

module.exports.deleteApplication = {
  method: DELETE,
  path:   (appId) => `/applications/${appId}`,
};

module.exports.deleteApplicationDocumentation = {
  method: DELETE,
  path:   (appId) => `/applications/${appId}/documentation`,
};

module.exports.deleteApplicationTask = {
  method: DELETE,
  path:   (appId, taskId) => `/applications/${appId}/tasks/${taskId}`,
};

module.exports.getApplication = {
  method: GET,
  path:   (appId) => `/applications/${appId}`,
};

module.exports.getApplicationBillingDetail = {
  method: GET,
  path:   (appId) => `/applications/${appId}/billing`,
};

module.exports.getApplicationDeploymentCost = {
  method: POST,
  path:   (appId) => `/applications/${appId};deployment/calcPrice`,
};

module.exports.getApplicationDesignCost = {
  method: POST,
  path:   (appId) => `/applications/${appId};design/calcPrice`,
};

module.exports.getApplicationDocumentation = {
  method: GET,
  path:   (appId) => `/applications/${appId}/documentation`,
};

module.exports.getApplicationTask = {
  method: GET,
  path:   (appId, taskId) => `/applications/${appId}/tasks/${taskId}`,
};

module.exports.isApplicationPublished = {
  method: GET,
  path:   (appId) => `/applications/${appId}/isPublished`,
};

module.exports.listApplicationPublishLocations = {
  method: POST,
  path:   (appId) => `/applications/${appId}/findPublishLocations`,
};

module.exports.listApplications = {
  method: GET,
  path:   '/applications',
};

module.exports.listApplicationTasks = {
  method: GET,
  path:   (appId) => `/applications/${appId}/tasks`,
};

module.exports.publishApplication = {
  method: POST,
  path:   (appId) => `/applications/${appId}/publish`,
};

module.exports.publishApplicationUpdates = {
  method: POST,
  path:   (appId) => `/applications/${appId}/${PUBLISH_UPDATES}`,
};

module.exports.resetApplicationDisks = {
  method: POST,
  path:   (appId) => `/applications/${appId}/${RESET_DISKS}`,
};

module.exports.restartApplication = {
  method: POST,
  path:   (appId) => `/applications/${appId}/${RESTART}`,
};

module.exports.setApplicationExpiration = {
  method: POST,
  path:   (appId) => `/applications/${appId}/setExpiration`,
};

module.exports.startApplication = {
  method: POST,
  path:   (appId) => `/applications/${appId}/${START}`,
};

module.exports.stopApplication = {
  method: POST,
  path:   (appId) => `/applications/${appId}/${STOP}`,
};

module.exports.updateApplication = {
  method: PUT,
  path:   (appId) => `/applications/${appId}`,
};

module.exports.updateApplicationDocumentation = {
  method: PUT,
  path:   (appId) => `/applications/${appId}/documentation`,
};

module.exports.updateApplicationTask = {
  method: PUT,
  path:   (appId, taskId) => `/applications/${appId}/tasks/${taskId}`,
};

// Billing
module.exports.getBillingDetails = {
  method: GET,
  path:   '/billing',
};

module.exports.getBillingDetailsByCostBucket = {
  method: GET,
  path:   '/billing/costBucket',
};

// Blueprints
module.exports.createBlueprint = {
  method: POST,
  path:   '/blueprints',
};

module.exports.createBlueprintDocumentation = {
  method: POST,
  path:   (blueprintId) => `/blueprints/${blueprintId}/documentation`,
};

module.exports.deleteBlueprintDocumentation = {
  method: DELETE,
  path:   (blueprintId) => `/blueprints/${blueprintId}/documentation`,
};

module.exports.getBlueprint = {
  method: GET,
  path:   (blueprintId) => `/blueprints/${blueprintId}`,
};

module.exports.getBlueprintDocumentation = {
  method: GET,
  path:   (blueprintId) => `/blueprints/${blueprintId}/documentation`,
};

module.exports.deleteBlueprint = {
  method: DELETE,
  path:   (blueprintId) => `/blueprints/${blueprintId}`,
};

module.exports.listBlueprintPublishLocations = {
  method: GET,
  path:   (blueprintId) => `/blueprints/${blueprintId}/publishLocations`,
};

module.exports.listBlueprints = {
  method: GET,
  path:   '/blueprints',
};

module.exports.listPrivateBlueprints = {
  method: GET,
  path:   (organizationId) => `/organizations/${organizationId}/blueprints`,
};

module.exports.updateBlueprintDocumentation = {
  method: PUT,
  path:   (blueprintId) => `/blueprints/${blueprintId}/documentation`,
};

// Communities
module.exports.getCommunity = {
  method: GET,
  path:   (communityId) => `/communities/${communityId}`,
};

module.exports.listCommunities = {
  method: GET,
  path:   '/communities',
};

// Cost Alerts
module.exports.addCostAlertUser = {
  method: POST,
  path:   (costAlertId, userId) => `/costAlertDefinitions/${costAlertId}/users/${userId}`,
};

module.exports.createCostAlert = {
  method: POST,
  path:   '/costAlertDefinitions',
};

module.exports.deleteCostAlert = {
  method: DELETE,
  path:   (costAlertId) => `/costAlertDefinitions/${costAlertId}`,
};

module.exports.getCostAlert = {
  method: GET,
  path:   (costAlertId) => `/costAlertDefinitions/${costAlertId}`,
};

module.exports.getCostAlertUsers = {
  method: GET,
  path:   (costAlertId) => `/costAlertDefinitions/${costAlertId}`/users,
};

module.exports.listCostAlerts = {
  method: GET,
  path:   (costBucketId) => `/costBuckets/${costBucketId}/costAlertDefinitions`,
};

module.exports.removeCostAlertUser = {
  method: DELETE,
  path:   (costAlertId, userId) => `/costAlertDefinitions/${costAlertId}/users/${userId}`,
};

module.exports.updateCostAlert = {
  method: PUT,
  path:   (costAlertId) => `/costAlertDefinitions/${costAlertId}`,
};

// Cost Buckets
module.exports.createCostBucket = {
  method: POST,
  path:   '/costBuckets',
};

module.exports.setResourceCostBucket = {
  method: PUT,
  path:   (costBucketId) => `/costBuckets/${costBucketId}/associateResource`,
};

module.exports.getCostBucket = {
  method: GET,
  path:   (costBucketId) => `/costBuckets/${costBucketId}`,
};

module.exports.getCostBucketDescriptors = {
  method: GET,
  path:   '/costBuckets/describe',
};

module.exports.listCostBuckets = {
  method: GET,
  path:   '/costBuckets',
};

module.exports.updateCostBucket = {
  method: PUT,
  path:   (costBucketId) => `/costBuckets/${costBucketId}`,
};

// DHCP Servers
module.exports.createDHCPServer = {
  method: POST,
  path:   (appId) => `/applications/${appId}/network/services/dhcpServers;design`
};

module.exports.getDnsServer = {
  method: GET,
  path:   (appId, dhcpServerId) => `/applications/${appId}/network/services/dhcpServers/${dhcpServerId}`,
};

module.exports.getDHCPServerDeployment = {
  method: GET,
  path:   (appId, dhcpServerId) => `/applications/${appId}/network/services/dhcpServers/${dhcpServerId};deployment`,
};

module.exports.getDHCPServerDesign = {
  method: GET,
  path:   (appId, dhcpServerId) => `/applications/${appId}/network/services/dhcpServers/${dhcpServerId};design`,
};

module.exports.deleteDHCPServer = {
  method: DELETE,
  path:   (appId, dhcpServerId) => `/applications/${appId}/network/services/dhcpServers/${dhcpServerId};design`,
};

module.exports.listDHCPServers = {
  method: GET,
  path:   (appId) => `/applications/${appId}/network/services/dhcpServers`,
};

module.exports.listDHCPServersDeployment = {
  method: GET,
  path:   (appId) => `/applications/${appId}/network/services/dhcpServers;deployment`,
};

module.exports.listDHCPServersDesign = {
  method: GET,
  path:   (appId) => `/applications/${appId}/network/services/dhcpServers;design`,
};

module.exports.updateDHCPServer = {
  method: PUT,
  path:   (appId, dhcpServerId) => `/applications/${appId}/network/services/dhcpServers/${dhcpServerId};design`,
};

// Disk Images
module.exports.createDiskImage = {
  method: POST,
  path:   '/diskImages',
};

module.exports.createDiskImageDocumentation = {
  method: POST,
  path:   (diskImageId) => `/diskImages/${diskImageId}/documentation`,
};

module.exports.deleteDiskImage = {
  method: DELETE,
  path:   (diskImageId) => `/diskImages/${diskImageId}`,
};

module.exports.deleteDiskImageDocumentation = {
  method: DELETE,
  path:   (diskImageId) => `/diskImages/${diskImageId}/documentation`,
};

module.exports.getDiskImage = {
  method: GET,
  path:   (diskImageId) => `/diskImages/${diskImageId}`,
};

module.exports.getDiskImageDocumentation = {
  method: GET,
  path:   (diskImageId) => `/diskImages/${diskImageId}/documentation`,
};

module.exports.listDiskImages = {
  method: GET,
  path:   '/diskImages',
};

module.exports.updateDiskImage = {
  method: PUT,
  path:   (diskImageId) => `/diskImages/${diskImageId}`,
};

module.exports.updateDiskImageDocumentation = {
  method: PUT,
  path:   (diskImageId) => `/diskImages/${diskImageId}/documentation`,
};

// DNS Servers
module.exports.createDNSServer = {
  method: POST,
  path:   (appId) => `/applications/${appId}/network/services/dnsServers;design`
};

module.exports.getDnsServer = {
  method: GET,
  path:   (appId, dnsServerId) => `/applications/${appId}/network/services/dnsServers/${dnsServerId}`,
};

module.exports.getDNSServerDeployment = {
  method: GET,
  path:   (appId, dnsServerId) => `/applications/${appId}/network/services/dnsServers/${dnsServerId};deployment`,
};

module.exports.getDNSServerDesign = {
  method: GET,
  path:   (appId, dnsServerId) => `/applications/${appId}/network/services/dnsServers/${dnsServerId};design`,
};

module.exports.deleteDNSServer = {
  method: DELETE,
  path:   (appId, dnsServerId) => `/applications/${appId}/network/services/dnsServers/${dnsServerId};design`,
};

module.exports.listDNSServers = {
  method: GET,
  path:   (appId) => `/applications/${appId}/network/services/dnsServers`,
};

module.exports.listDNSServersDeployment = {
  method: GET,
  path:   (appId) => `/applications/${appId}/network/services/dnsServers;deployment`,
};

module.exports.listDNSServersDesign = {
  method: GET,
  path:   (appId) => `/applications/${appId}/network/services/dnsServers;design`,
};

module.exports.updateDNSServer = {
  method: PUT,
  path:   (appId, dnsServerId) => `/applications/${appId}/network/services/dnsServers/${dnsServerId};design`,
};

// Elastic IPs
module.exports.createElasticIP = {
  method: POST,
  path:   '/elasticIps',
};

module.exports.deleteElasticIP = {
  method: DELETE,
  path:   (eipId) => `/elasticIps/${eipId}`,
};

module.exports.listElasticIPPools = {
  method: GET,
  path:   '/elasticIps/locations',
};

module.exports.listElasticIPs = {
  method: GET,
  path:   '/elasticIps',
};

// Ephemeral Access Tokens
module.exports.createAccessToken = {
  method: POST,
  path:   '/ephemeralAccessTokens',
};

module.exports.deleteAccessToken = {
  method: DELETE,
  path:   (eatId) => `/ephemeralAccessTokens/${eatId}`,
};

module.exports.getAccessToken = {
  method: GET,
  path:   (eatId) => `/ephemeralAccessTokens/${eatId}`,
};

module.exports.listAccessTokens = {
  method: GET,
  path:   'ephemeralAccessTokens',
};

module.exports.updateAccessToken = {
  method: PUT,
  path:   (eatId) => `/ephemeralAccessTokens/${eatId}`,
};

// Events
module.exports.listEvents = {
  method: GET,
  path:   '/events',
};

// Images
module.exports.createImage = {
  method: POST,
  path:   '/images',
};

module.exports.createImageDocumentation = {
  method: POST,
  path:   (imageId) => `/images/${imageId}/documentation`,
};

module.exports.deleteImage = {
  method: DELETE,
  path:   (imageId) => `/images/${imageId}`,
};

module.exports.deleteImageDocumentation = {
  method: DELETE,
  path:   (imageId) => `/images/${imageId}/documentation`,
};

module.exports.getImage = {
  method: GET,
  path:   (imageId) => `/images/${imageId}`,
};

module.exports.getImageDocumentation = {
  method: GET,
  path:   (imageId) => `/images/${imageId}/documentation`,
};

module.exports.listImages = {
  method: GET,
  path:   '/images',
};

module.exports.listPrivateImages = {
  method: GET,
  path:   (organizationId) => `/organizations/${organizationId}/images`,
};

module.exports.updateImage = {
  method: PUT,
  path:   (imageId) => `/images/${imageId}`,
};

module.exports.updateImageDocumentation = {
  method: PUT,
  path:   (imageId) => `/images/${imageId}/documentation`,
};

// Key Pairs
module.exports.createKeyPair = {
  method: POST,
  path:   '/keypairs',
};

module.exports.deleteKeyPair = {
  method: DELETE,
  path:   (keypairId) => `/keypairs/${keypairId}`,
};

module.exports.generateKeyPair = {
  method: POST,
  path:   '/keypairs/generate',
};

module.exports.getKeyPair = {
  method: GET,
  path:   (keypairId) => `/keypairs/${keypairId}`,
};

module.exports.listKeyPairs = {
  method: GET,
  path:   '/keypairs',
};

module.exports.updateKeyPair = {
  method: PUT,
  path:   (keypairId) => `/keypairs/${keypairId}`,
};

// Network Interfaces
module.exports.createNetworkInterface = {
  method: POST,
  path:   (appId) => `/applications/${appId}/network/services/networkInterfaces;design`,
};

module.exports.deleteNetworkInterface = {
  method: DELETE,
  path:   (appId, ifaceId) => `/applications/${appId}/network/services/networkInterfaces/${ifaceId};design`,
};

module.exports.getNetworkInterface = {
  method: GET,
  path:   (appId, ifaceId) => `/applications/${appId}/network/services/networkInterfaces/${ifaceId}`,
};

module.exports.getNetworkInterfaceDeployment = {
  method: GET,
  path:   (appId, ifaceId) => `/applications/${appId}/network/services/networkInterfaces/${ifaceId};deployment`,
};

module.exports.getNetworkInterfaceDesign = {
  method: GET,
  path:   (appId, ifaceId) => `/applications/${appId}/network/services/networkInterfaces/${ifaceId};design`,
};

module.exports.listNetworkInterfaces = {
  method: GET,
  path:   (appId) => `/applications/${appId}/network/services/networkInterfaces`,
};

module.exports.listNetworkInterfacesDeployment = {
  method: GET,
  path:   (appId) => `/applications/${appId}/network/services/networkInterfaces;deployment`,
};

module.exports.listNetworkInterfacesDesign = {
  method: GET,
  path:   (appId) => `/applications/${appId}/network/services/networkInterfaces;design`,
};

module.exports.updateNetworkInterface = {
  method: PUT,
  path:   (appId, ifaceId) => `/applications/${appId}/network/services/networkInterfaces/${ifaceId};design`,
};

// Notifications
module.exports.searchNotifications = {
  method: POST,
  path:   '/notifications/search',
};

// Organizations
module.exports.getCurrentOrganization = {
  method: GET,
  path:   '/organization',
};

module.exports.getOrganization = {
  method: GET,
  path:   (organizationId) => `/organizations/${organizationId}`,
};

module.exports.listOrganizationUsers = {
  method: GET,
  path:   (organizationId) => `/organizations/${organizationId}/users`,
};

module.exports.updateOrganization = {
  method: PUT,
  path:   (organizationId) => `/organizations/${organizationId}`,
};

// Permission Groups
module.exports.addPermissionGroupUser = {
  method: POST,
  path:   (pgId) => `/permissionGroups/${pgId}/users`,
};

module.exports.createPermissionGroup = {
  method: POST,
  path:   '/permissionGroups',
};

module.exports.deletePermissionGroup = {
  method: DELETE,
  path:   (pgId) => `/permissionGroups/${pgId}`,
};

module.exports.deletePermissionGroupUser = {
  method: POST,
  path:   (pgId, userId) => `/permissionGroups/${pgId}/users/${userId}`,
};

module.exports.getPermissionGroup = {
  method: GET,
  path:   (pgId) => `/permissionGroups/${pgId}`,
};

module.exports.getPermissionGroupDescriptors = {
  method: GET,
  path:   '/permissionGroups/describe',
};

module.exports.listPermissionGroups = {
  method: GET,
  path:   '/permissionGroups',
};

module.exports.listPermissionGroupUsers = {
  method: GET,
  path:   (pgId) => `/permissionGroups/${pgId}/users`,
};

module.exports.updatePermissionGroup = {
  method: PUT,
  path:   (pgId) => `/permissionGroups/${pgId}`,
};

// Routers
module.exports.createRouter = {
  method: POST,
  path:   (appId) => `/applications/${appId}/network/services/routers;design`,
};

module.exports.deleteRouter = {
  method: DELETE,
  path:   (appId, routerId) => `/applications/${appId}/network/services/routers/${routerId};design`,
};

module.exports.getRouter = {
  method: GET,
  path:   (appId, routerId) => `/applications/${appId}/network/services/routers/${routerId}`,
};

module.exports.getRouterDeployment = {
  method: GET,
  path:   (appId, routerId) => `/applications/${appId}/network/services/routers/${routerId};deployment`,
};

module.exports.getRouterDesign = {
  method: GET,
  path:   (appId, routerId) => `/applications/${appId}/network/services/routers/${routerId};design`,
};

module.exports.listRouters = {
  method: GET,
  path:   (appId) => `/applications/${appId}/network/services/routers`,
};

module.exports.listRoutersDeployment = {
  method: GET,
  path:   (appId) => `/applications/${appId}/network/services/routers;deployment`,
};

module.exports.listRoutersDesign = {
  method: GET,
  path:   (appId) => `/applications/${appId}/network/services/routers;design`,
};

module.exports.updateRouter = {
  method: PUT,
  path:   (appId, routerId) => `/applications/${appId}/network/services/routers/${routerId};design`,
};

// Shares
module.exports.createShare = {
  method: POST,
  path:   '/shares',
};

module.exports.deleteShare = {
  method: DELETE,
  path:   (shareId) => `/shares/${shareId}`,
};

module.exports.listShares = {
  method: GET,
  path:   '/shares',
};

// Subnets
module.exports.createSubnet = {
  method: POST,
  path:   (appId) => `/applications/${appId}/network/subnets;design`,
};

module.exports.deleteSubnet = {
  method: DELETE,
  path:   (appId, subnetId) => `/applications/${appId}/network/subnets/${subnetId};design`,
};

module.exports.getSubnet = {
  method: GET,
  path:   (appId, subnetId) => `/applications/${appId}/network/subnets/${subnetId}`
};

module.exports.getSubnetDeployment = {
  method: GET,
  path:   (appId, subnetId) => `/applications/${appId}/network/subnets/${subnetId};deployment`
};

module.exports.getSubnetDesign = {
  method: GET,
  path:   (appId, subnetId) => `/applications/${appId}/network/subnets/${subnetId};design`
};

module.exports.listSubnets = {
  method: GET,
  path:   (appId) => `/applications/${appId}/network/subnets`
};

module.exports.listSubnetsDeployment = {
  method: GET,
  path:   (appId) => `/applications/${appId}/network/subnets;deployment`
};

module.exports.listSubnetsDesign = {
  method: GET,
  path:   (appId) => `/applications/${appId}/network/subnets;design`
};

module.exports.updateSubnet = {
  method: PUT,
  path:   (appId, subnetId) => `/applications/${appId}/network/subnets/${subnetId};design`,
};

// Switches
module.exports.createSwitch = {
  method: POST,
  path:   (appId) => `/applications/${appId}/network/switches;design`,
};

module.exports.createSwitchPort = {
  method: POST,
  path:   (appId, switchId) => `/applications/${appId}/network/switches/${switchId}/ports;design`,
};

module.exports.deleteSwitch = {
  method: DELETE,
  path:   (appId, switchId) => `/applications/${appId}/network/switches/${switchId};design`,
};

module.exports.deleteSwitchPort = {
  method: DELETE,
  path:   (appId, switchId, portId) => `/applications/${appId}/network/switches/${switchId}/ports/${portId};design`,
};

module.exports.getSwitch = {
  method: GET,
  path:   (appId, switchId) => `/applications/${appId}/network/switches/${switchId}`,
};

module.exports.getSwitchDeployment = {
  method: GET,
  path:   (appId, switchId) => `/applications/${appId}/network/switches/${switchId};deployment`,
};

module.exports.getSwitchDesign = {
  method: GET,
  path:   (appId, switchId) => `/applications/${appId}/network/switches/${switchId};design`,
};

module.exports.getSwitchPort = {
  method: GET,
  path:   (appId, switchId, portId) => `/applications/${appId}/network/switches/${switchId}/ports/${portId}`,
};

module.exports.getSwitchPortDeployment = {
  method: GET,
  path:   (appId, switchId, portId) => `/applications/${appId}/network/switches/${switchId}/ports/${portId};deployment`,
};

module.exports.getSwitchPortDesign = {
  method: GET,
  path:   (appId, switchId, portId) => `/applications/${appId}/network/switches/${switchId}/ports/${portId};design`,
};

module.exports.listSwitches = {
  method: GET,
  path:   (appId) => `/applications/${appId}/network/switches`,
};

module.exports.listSwitchesDeployment = {
  method: GET,
  path:   (appId) => `/applications/${appId}/network/switches;deployment`,
};

module.exports.listSwitchesDesign = {
  method: GET,
  path:   (appId) => `/applications/${appId}/network/switches;design`,
};

module.exports.listSwitchPorts = {
  method: GET,
  path:   (appId, switchId) => `/applications/${appId}/network/switches/${switchId}/ports`,
};

module.exports.listSwitchPortsDeployment = {
  method: GET,
  path:   (appId, switchId) => `/applications/${appId}/network/switches/${switchId}/ports;deployment`,
};

module.exports.listSwitchPortsDesign = {
  method: GET,
  path:   (appId, switchId) => `/applications/${appId}/network/switches/${switchId}/ports;design`,
};

module.exports.updateSwitch = {
  method: PUT,
  path:   (appId, switchId) => `/applications/${appId}/network/switches/${switchId};design`,
};

module.exports.updateSwitchPort = {
  method: PUT,
  path:   (appId, switchId, portId) => `/applications/${appId}/network/switches/${switchId}/ports/${portId};design`,
};

// Users
module.exports.changeUserPassword = {
  method: PUT,
  path:   (userId) => `/users/${userId}/changepw`,
};

module.exports.disableUser = {
  method: PUT,
  path:   (userId) => `/users/${userId}/disable`,
};

module.exports.enableUser = {
  method: PUT,
  path:   (userId) => `/users/${userId}/enable`,
};

module.exports.getCurrentUser = {
  method: GET,
  path:   '/user',
};

module.exports.inviteUser = {
  method: POST,
  path:   '/users/invite',
};

module.exports.listUsers = {
  method: GET,
  path:   '/users',
};

module.exports.updateUser = {
  method: PUT,
  path:   (userId) => `/users/${userId}`,
};


// VMs
module.exports.createVM = {
  method: POST,
  path:   (appId) => `/applications/${appId}/vms`,
};

module.exports.deleteVM = {
  method: DELETE,
  path:   (appId, vmId) => `/applications/${appId}/vms/${vmId}`,
};

module.exports.getVM = {
  method: GET,
  path:   (appId, vmId) => `/applications/${appId}/vms/${vmId}`,
};

module.exports.getVMDesign = {
  method: GET,
  path:   (appId, vmId) => `/applications/${appId}/vms/${vmId};design`,
};

module.exports.getVMDeployment = {
  method: GET,
  path:   (appId, vmId) => `/applications/${appId}/vms/${vmId};deployment`,
};

module.exports.getVMFQDN = {
  method: GET,
  path:   (appId, vmId) => `/applications/${appId}/vms/${vmId}/fqdn;deployment`,
};

module.exports.getVMPublicIPs = {
  method: GET,
  path:   (appId, vmId) => `/applications/${appId}/vms/${vmId}/publicIps;deployment`,
};

module.exports.getVMs = {
  method: GET,
  path:   (appId) => `/applications/${appId}/vms`,
};

module.exports.getVMsDeployment = {
  method: GET,
  path:   (appId) => `/applications/${appId};deployment/vms`,
};

module.exports.getVMsDesign = {
  method: GET,
  path:   (appId) => `/applications/${appId};design/vms`,
};

module.exports.getVMState = {
  method: GET,
  path:   (appId, vmId) => `/applications/${appId}/vms/${vmId}/state;deployment`,
};

module.exports.getVMVMCURL = {
  method: GET,
  path:   (appId, vmId) => `/applications/${appId}/vms/${vmId}/vncUrl`,
};

module.exports.poweroffVM = {
  method: POST,
  path:   (appId, vmId) => `/applications/${appId}/vms/${vmId}/${POWEROFF}`,
};

module.exports.redeployVM = {
  method: POST,
  path:   (appId, vmId) => `/applications/${appId}/vms/${vmId}/${REDEPLOY}`,
};

module.exports.repairVM = {
  method: POST,
  path:   (appId, vmId) => `/applications/${appId}/vms/${vmId}/${REPAIR}`,
};

module.exports.resetVMDisks = {
  method: POST,
  path:   (appId, vmId) => `/applications/${appId}/vms/${vmId}/${RESET_DISKS}`,
};

module.exports.restartVM = {
  method: POST,
  path:   (appId, vmId) => `/applications/${appId}/vms/${vmId}/${RESTART}`,
};

module.exports.shutdownVM = {
  method: POST,
  path:   (appId, vmId) => `/applications/${appId}/vms/${vmId}/${SHUTDOWN}`,
};

module.exports.startVM = {
  method: POST,
  path:   (appId, vmId) => `/applications/${appId}/vms/${vmId}/${START}`,
};

module.exports.stopVM = {
  method: POST,
  path:   (appId, vmId) => `/applications/${appId}/vms/${vmId}/${STOP}`,
};

module.exports.updateVM = {
  method: PUT,
  path:   (appId, vmId) => `/applications/${appId}/vms/${vmId}`,
};


