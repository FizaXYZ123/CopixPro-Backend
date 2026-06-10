export default {
  routes: [
    {
      method: "GET",
      path: "/dashboard/stats",
      handler: "admin-panel-stats.getStats",
      config: {
        auth:{}
      },
    },
     {
      method: "GET",
      path: "/clients",
      handler: "admin-panel-stats.getClients",
      config: {
        auth:{}
      },
    },
  ],
};