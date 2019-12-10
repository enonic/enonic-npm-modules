function createCompiler() {
  return {
    plugin: {
      doneFn: null
    },
    hooks: {
      done: {
        tap: function tap(plugin, doneFn) {
          // eslint-disable-next-line no-param-reassign
          plugin.doneFn = doneFn;
          return plugin;
        }
      }
    }
  };
}

function createStats(hasStats = true) {
  return {
    compilation: {
      warnings: ['warning'],
      errors: ['error']
    },
    hasWarnings: () => hasStats,
    hasErrors: () => hasStats
  };
}

module.exports = {
  createCompiler,
  createStats
};
