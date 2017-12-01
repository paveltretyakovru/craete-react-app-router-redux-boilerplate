const requireContext = require.context('../i/sprite/', false, /\.svg$/);
requireContext.keys().map(requireContext);