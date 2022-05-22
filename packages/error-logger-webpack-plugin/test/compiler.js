function createCompiler() {
  const compiler = {
    doneFn: null,
    hooks: {
      done: {},
    },
  };
  compiler.hooks.done.tap = (plugin, doneFn) => {
    compiler.doneFn = doneFn;
  };
  return compiler;
}

function createStats(hasStats = true) {
  return {
    compilation: {
      warnings: ['Test warning.'],
      errors: ['Test error.'],
    },
    hasWarnings: () => hasStats,
    hasErrors: () => hasStats,
  };
}

module.exports = {
  createCompiler,
  createStats,
};
