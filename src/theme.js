import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools';

// 2. Add your color mode config
const config = {
  initialColorMode: 'system',
  useSystemColorMode: false,
}

const styles = {
    global: props => ({
      body: {
        // color: mode('gray.800', 'whiteAlpha.900')(props),
        // bg: mode('gray.100', '#AAAAAA')(props),
      },
      test: {
        bg: mode('gray.100', 'gray.700'),
      }
    }),
};

// 3. extend the theme
const theme = extendTheme({ 
    config, 
    styles,
    layerStyles: {
        lightBox: {
          bg: 'gray.100'
        },
        darkBox: {
          bg: 'gray.700',
        },
    },
    components: {
        // Box: {
        //     baseStyle: {
        //         fontWeight: "bold", // Normally, it is "semibold"
        //     },
        //     variants: {
        //         solid: (props) => ({
        //         bg: mode('gray.100', 'gray.700')(props),
        //         }),
        //     },
        // },
      },

})

export default theme