module.exports = ({ env }) => ({
  upload: {
    config: {
      sizeLimit: 50 * 1024 * 1024, // 50MB
    },
  },
});
