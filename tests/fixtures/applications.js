const baseDetails = {
  creationTime: "1000000000000",
  designDiffersFromDeployment:false,
  published: false,
  version: 1,
};

const owner = {
  owner: 'WOO API',
  ownerDetails: {  
    userId: "10000000",
    name: "WOO API",
    deleted: false
  },
};

const costBucket = {
  costBucketId: "10000000",
  costBucket: {
    id: "10000000",
    creationTime: "1000000000000",
    name: "Organization",
    deleted: false
  },
};

const baseDesign = {
  design: {  
    network: {
      subnets: [{  
        id: "1000000000000000000",
        dhcp: {  
          id: "1000000000000000000",
          ip:"10.0.0.1",
          active: true,
          ipRangeBegin: "10.0.0.1",
          ipRangeEnd: "10.0.255.254"
        },
        ip: "10.0.0.0",
        mask: "255.255.0.0"
      }],
      dnsService: {  
        id: "1000000000000000000"
      }
    },
    networkFilter: {  
      accessAllowedByDefault: false,
      filteringEnabled: false,
      blockOutgoingTraffic: false
    },
    stopVmsByOrder: false
  }
};

module.exports.baseApplication = {  
  id: "10000000",
  name: "Application",
  ...baseDetails,
  ...owner,
  ...costBucket,
  ...baseDesign,
};

module.exports.designPrice = {
  "appTier": "ADVANCED",
  "optimizationLevel": "PERFORMANCE_OPTIMIZED",
  "productsSummary": [{
    "productCount": 0,
    "productType": "NETWORKING_MB",
    "productUname": "NETWORKING_MB",
    "summaryPrice": 0
  }, {
    "productCount": 1,
    "productType": "MINIMUM",
    "productUname": "MINIMUM.ADVANCED.PERFORMANCE_OPTIMIZED",
    "summaryPrice": 0.5
  }],
  "totalActiveVms": 0,
  "totalAppCpuCount": 0,
  "totalAppMemoryInGb": 0,
  "totalDiskspaceInGb": 0,
  "totalIpAddressCount": 0,
  "totalPrice": 0.5
};

module.exports.deploymentPrice = {  
  "appTier":"ADVANCED",
  "optimizationLevel":"COST_OPTIMIZED",
  "productsSummary":[{  
    "productCount":1,
    "productType":"IP_ADDRESS",
    "productUname":"IP_ADDRESS",
    "summaryPrice":0.01
  }, {  
    "productCount":0,
    "productType":"NETWORKING_MB",
    "productUname":"NETWORKING_MB",
    "summaryPrice":0
  }, {  
    "productCount":2048,
    "productType":"DISKSPACE_MB",
    "productUname":"DISKSPACE_MB",
    "summaryPrice":0.0006774193548387123
  }, {  
    "productCount":1,
    "productType":"R1",
    "productUname":"R1.ADVANCED.COST_OPTIMIZED",
    "summaryPrice":0
  }, {  
    "productCount":1,
    "productType":"MINIMUM",
    "productUname":"MINIMUM.ADVANCED.COST_OPTIMIZED",
    "summaryPrice":0.3
  }],
  "totalActiveVms":1,
  "totalAppCpuCount":1,
  "totalAppMemoryInGb":2,
  "totalDiskspaceInGb":2,
  "totalIpAddressCount":1,
  "totalPrice":0.3106774193548387
}

module.exports.task = {
  "id": "123",
  "entityId": "6",
  "entityType": "APPLICATION",
  "action": "STOP",
  "scheduleInfo": {
          "start": "1425821063194",
          "end": null,
          "cronExpression": "0 0 10  * * ?",
          "timezone": "UTC"
      },
  "args": {
          "appId": "6"
      },
  "description": "stop application 6 at 10 AM daily"
};

module.exports.publishLocations = [{"cloudDisplayName": "Oracle Ravello Cloud", "cloudName": "oracle-ravello-cloud", "deprecated": false, "regionDisplayName": "US East 5", "regionName": "us-east-5"}];
