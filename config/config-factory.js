const ServerConfig = {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 4444
};

const JWTConfig = {
    secret: process.env.JWT_SECRET || '23908j98jfa98jh90a8weu98',
    issuer: process.env.JWT_ISSUER || `http://${ServerConfig.host}:${ServerConfig.port}`,
    realm: process.env.JWT_REALM || 'com.duncannevin'
};

module.exports = { ServerConfig, JWTConfig };
