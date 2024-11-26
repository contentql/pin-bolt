import path from 'path'
import process from 'process'

export const blogListData = [
  {
    title: 'Tools I Use Every Day: My Go-To Digital Toolkit 🛠️',
    description: 'Tools i use everyday to get my work done!',
    slug: 'tools-i-use-every-day-my-go-to-digital-toolkit',
    content: [
      {
        children: [
          {
            text: "Hey there👋 Today, I'm excited to share with you the tools that keep my work flowing smoothly. Whether you're a designer, developer, or content creator, these apps might just become your new best friends. ",
          },
          {
            text: "Let's dive in!",
            italic: true,
            underline: true,
          },
        ],
      },
      {
        children: [
          {
            text: '',
          },
        ],
      },
      {
        children: [
          {
            text: 'Lost time⏰ is never found again.',
          },
        ],
        type: 'blockquote',
      },
      {
        children: [
          {
            text: '\n',
          },
          {
            text: 'Image Optimization 🖼️',
            bold: true,
          },
        ],
        type: 'h3',
      },
      {
        type: 'ol',
        children: [
          {
            type: 'li',
            children: [
              {
                children: [
                  {
                    text: 'Optimizilla:',
                    bold: true,
                  },
                  {
                    text: " This is my go-to for image compression. It's like a magic wand that makes my images web-friendly without losing quality. Smaller file sizes, faster loading times - what's not to love? 🚀 \nurl:  ",
                  },
                  {
                    type: 'link',
                    newTab: true,
                    url: 'https://imagecompressor.com/',
                    children: [
                      {
                        text: 'Image Compressor',
                      },
                    ],
                    linkType: 'custom',
                    doc: {
                      relationTo: 'tags',
                      value: '66f3cddd797f6e0ec0d5b750',
                    },
                  },
                  {
                    text: '',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'ol',
        children: [
          {
            type: 'li',
            children: [
              {
                children: [
                  {
                    text: 'Cloudconvert: ',
                    bold: true,
                  },
                  {
                    text: "Need to change image formats? Cloud-convert is my secret weapon. JPEG to WebP? No problem! It's like having a Swiss Army knife for file conversions. 🔄\nurl: ",
                  },
                  {
                    type: 'link',
                    newTab: true,
                    url: 'https://cloudconvert.com/',
                    children: [
                      {
                        text: 'https://cloudconvert.com',
                      },
                    ],
                  },
                  {
                    text: '',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        children: [
          {
            text: '\n',
          },
        ],
      },
      {
        type: 'h3',
        children: [
          {
            text: 'Icons 🎨',
            bold: true,
          },
        ],
      },
      {
        type: 'ol',
        children: [
          {
            type: 'li',
            children: [
              {
                children: [
                  {
                    text: 'Icons8, Heroicons:',
                    bold: true,
                  },
                  {
                    text: " These two are my icon treasure troves. Whether I need a sleek UI icon or something more playful, these sites have got me covered. It's like having a personal icon artist on speed dial! 📞\nurl: ",
                  },
                  {
                    type: 'link',
                    newTab: true,
                    url: 'https://icons8.com/',
                    children: [
                      {
                        text: 'https://icons8.com',
                      },
                    ],
                  },
                  {
                    text: ', ',
                  },
                  {
                    type: 'link',
                    newTab: true,
                    url: 'https://heroicons.com/',
                    children: [
                      {
                        text: 'https://heroicons.com',
                      },
                    ],
                  },
                  {
                    text: '',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        children: [
          {
            text: '\n',
          },
        ],
      },
      {
        type: 'h3',
        children: [
          {
            text: 'Image Resources 📸',
            bold: true,
          },
        ],
      },
      {
        type: 'ol',
        children: [
          {
            type: 'li',
            children: [
              {
                children: [
                  {
                    text: 'Freepik, Unsplash, Pexels',
                    bold: true,
                  },
                  {
                    text: ': These are my top picks for free images. From stunning photography to cool AI-generated visuals (thanks, Freepik!), these sites are like having an endless photo album at my fingertips. 📚\nurl: ',
                  },
                  {
                    type: 'link',
                    newTab: true,
                    url: 'https://freepik.com/',
                    children: [
                      {
                        text: 'https://freepik.com',
                      },
                    ],
                  },
                  {
                    text: ', ',
                  },
                  {
                    type: 'link',
                    newTab: true,
                    url: 'https://unsplash.com/',
                    children: [
                      {
                        text: 'https://unsplash.com',
                      },
                    ],
                  },
                  {
                    text: ', ',
                  },
                  {
                    type: 'link',
                    newTab: true,
                    url: 'https://pexels.com/',
                    children: [
                      {
                        text: 'https://pexels.com',
                      },
                    ],
                  },
                  {
                    text: '\n\n\n',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'h3',
        children: [
          {
            text: 'Design Inspiration 💡',
            bold: true,
          },
        ],
      },
      {
        type: 'ol',
        children: [
          {
            type: 'li',
            children: [
              {
                children: [
                  {
                    text: 'Dribbble, Pinterest',
                    bold: true,
                  },
                  {
                    text: ": Whenever I'm in a creative rut, these are my go-to inspiration wells. It's like taking a stroll through a gallery of the world's most creative minds. Perfect for finding fresh UI ideas! 🎨\nurl: ",
                  },
                  {
                    type: 'link',
                    newTab: true,
                    url: 'https://dribbble.com/',
                    children: [
                      {
                        text: 'https://dribbble.com',
                      },
                    ],
                  },
                  {
                    text: ', ',
                  },
                  {
                    type: 'link',
                    newTab: true,
                    url: 'https://pinterest.com/',
                    children: [
                      {
                        text: 'https://pinterest.com',
                      },
                    ],
                  },
                  {
                    text: '',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        children: [
          {
            text: '\n',
          },
        ],
      },
      {
        type: 'h3',
        children: [
          {
            text: 'Premium Mockups 💼',
            bold: true,
          },
        ],
      },
      {
        type: 'ol',
        children: [
          {
            type: 'li',
            children: [
              {
                children: [
                  {
                    text: 'LS Graphics, Figma Community: ',
                    bold: true,
                  },
                  {
                    text: "When I need that extra polish, these are my secret weapons. High-quality mockups that make my designs shine? Yes, please! It's like having a professional photoshoot for my projects. 📸\nurl: ",
                  },
                  {
                    type: 'link',
                    newTab: true,
                    url: 'https://ls.graphics/',
                    children: [
                      {
                        text: 'https://ls.graphics',
                      },
                    ],
                  },
                  {
                    text: ', ',
                  },
                  {
                    type: 'link',
                    newTab: true,
                    url: 'https://www.figma.com/community',
                    children: [
                      {
                        text: 'https://www.figma.com/community',
                      },
                    ],
                  },
                  {
                    text: '',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        children: [
          {
            text: '\n',
          },
        ],
      },
      {
        type: 'h3',
        children: [
          {
            text: 'AI Assistance 🤖',
            bold: true,
          },
        ],
      },
      {
        type: 'ol',
        children: [
          {
            type: 'li',
            children: [
              {
                children: [
                  {
                    text: 'Claude:',
                    bold: true,
                  },
                  {
                    text: " Last but not least, my AI buddy Claude. Whether I'm generating content or need help with coding questions, Claude is like having a super-smart colleague available 24/7. 💬\nurl: ",
                  },
                  {
                    type: 'link',
                    newTab: true,
                    url: 'https://claude.ai/',
                    children: [
                      {
                        text: 'https://claude.ai/',
                      },
                    ],
                  },
                  {
                    text: '',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        children: [
          {
            text: '\n',
          },
        ],
      },
      {
        children: [
          {
            text: 'Fun fact this blog content was generated using ',
          },
          {
            text: 'Claude-AI,',
            bold: true,
          },
          {
            text: ' there you have it - my toolkit for staying productive and creative!\n\nHappy creating, everyone! 🎉',
          },
        ],
      },
    ],
    imageURL: path.join(
      process.cwd(),
      '/public/images/seed/blog-tools-i-use-everyday.avif',
    ),
    alt: 'Tools i use every day image',
    authorsList: ['bolt', 'sona'],
    tagsList: ['productivity'],
  },
  {
    title: 'How to play music on Nextjs App-router',
    description:
      'How to play songs using Nextjs App-router without using any packages',
    content: [
      {
        children: [
          {
            text: "Hi there👋, in this blog post, you'll learn how to create a simple music player in a Next.js application using the ",
          },
          {
            text: 'Audio API',
            strong: true,
          },
          {
            text: ". We'll leverage the Next.js App Router and client-side rendering to ensure audio functionality works seamlessly.We're using the NextJS App-router so by default everything written in code will be rendered server-side",
          },
        ],
      },
      {
        children: [
          {
            text: '',
          },
        ],
      },
      {
        children: [
          {
            text: 'Understanding Client-Side Components:',
            bold: true,
          },
        ],
        type: 'h2',
      },
      {
        children: [
          {
            text: 'Next.js offers use client directive. which indicates that the component should only be rendered on the client-side (in the browser). This is essential for audio playback because browser Audio APIs, like the object, are not directly accessible during server-side rendering',
          },
        ],
      },
      {
        children: [
          {
            text: '"use client";\n\nimport React, { useState, useEffect } from "react";\n\nconst MusicPlayer = () => {\n\nconst [song, setSong] = useState<HTMLAudioElement | null>(null);\n\n// Set up the audio element on component mount (client-side)\n\nuseEffect(() => {\n   if (typeof window !== "undefined") {\n   // Assuming song.mp3 exists in the public folder\n   setSong(new Audio("/sounds/song.mp3"));\n   }\n}, []);\n\n// on button click we\'re playing the music\nconst playMusic = () => {\n   if (song) song.play();\n};\n\nreturn <button onClick={playMusic}>Play</button>\n}',
            pre: true,
          },
        ],
      },
      {
        type: 'h4',
        children: [
          {
            text: 'Bonus: Controlling Audio Playback',
          },
        ],
      },
      {
        type: 'ul',
        children: [
          {
            children: [
              {
                text: 'You can handle the volume and change the playtime by using these methods',
              },
            ],
            type: 'li',
          },
        ],
      },
      {
        children: [
          {
            text: '  const playMusic = () => {\n     if (song) {\n       // Set volume to 50%\n       addSound.volume = 0.5;\n\n       // Start playback from the 19th second\n       addSound.currentTime = 19;\n       song.play();\n    }\n};',
            pre: true,
          },
        ],
      },
      {
        type: 'ul',
        children: [
          {
            children: [
              {
                text: 'While the built-in Audio API is sufficient for basic audio playback, libraries like use-sound (',
              },
              {
                type: 'link',
                newTab: true,
                url: 'https://www.npmjs.com/package/use-sound',
                children: [
                  {
                    text: 'https://www.npmjs.com/package/use-sound',
                  },
                ],
              },
              {
                text: ") can offer additional features and simplification. Explore these libraries if your application's audio requirements become more complex. However, be mindful of potential build-time issues and ensure compatibility with your project's setup.",
              },
            ],
            type: 'li',
          },
        ],
      },
      {
        children: [
          {
            text: '',
          },
        ],
      },
      {
        children: [
          {
            text: 'Thank you✌️, happy coding!',
          },
        ],
      },
      {
        children: [
          {
            text: '\n',
          },
        ],
      },
    ],
    slug: 'how-to-play-music-on-nextjs-app-router',
    authorsList: ['mimi-thian'],
    alt: 'How to play music in nextjs',
    tagsList: ['coding'],
    imageURL: path.join(
      process.cwd(),
      '/public/images/seed/blog-play-music-in-nextjs.avif',
    ),
  },
]

export const styleGuideBlogData = {
  title: 'Style Guide all supported elements',
  description:
    'This will guide help you to understand all the supported features for blog',
  authorsList: ['bolt'],
  tagsList: ['productivity'],
  alt: 'Style Guide all supported elements image',
  slug: 'style-guide-all-supported-elements',
  posterURL: path.join(
    process.cwd(),
    '/public/images/seed/blog-style-guide.webp',
  ),
  contentURL: path.join(
    process.cwd(),
    '/public/images/seed/blog-style-guide-content.jpg',
  ),
  contentAlt: 'A boy near sea shore',
  content: (id: number) => [
    {
      children: [
        {
          text: "Hi there👋, this post will help you understand all the wonderful elements that you get out-of-the-box! hope you'll have fun😃 ",
        },
      ],
    },
    {
      children: [
        {
          text: '',
        },
      ],
    },
    {
      type: 'h2',
      children: [
        {
          text: 'Typography',
        },
      ],
    },
    {
      children: [
        {
          text: 'Typography is important for indexing the layout of a web page and ranking its content in search engines. It is also used to highlight important topics, provide valuable information, and provide insight into the structure of the document.',
        },
      ],
    },
    {
      children: [
        {
          text: '',
        },
      ],
    },
    {
      children: [
        {
          text: 'Heading 1',
        },
      ],
      type: 'h1',
    },
    {
      children: [
        {
          text: 'Heading2',
        },
      ],
      type: 'h2',
    },
    {
      children: [
        {
          text: 'Heading 3',
        },
      ],
      type: 'h3',
    },
    {
      children: [
        {
          text: 'Heading 4',
        },
      ],
      type: 'h4',
    },
    {
      children: [
        {
          text: 'Heading 5',
        },
      ],
      type: 'h5',
    },
    {
      type: 'h6',
      children: [
        {
          text: 'Heading 6',
        },
      ],
    },
    {
      children: [
        {
          text: 'This is paragraph',
        },
      ],
    },
    {
      children: [
        {
          text: '',
        },
        {
          type: 'link',
          children: [
            {
              text: 'Redirection Link',
            },
          ],
          linkType: 'custom',
          newTab: true,
          url: 'https://youtube.com',
        },
        {
          text: '',
        },
      ],
    },
    {
      children: [
        {
          text: '',
        },
      ],
    },
    {
      type: 'h2',
      children: [
        {
          text: 'Highlighting',
        },
      ],
    },
    {
      children: [
        {
          text: 'Highlighting',
          mark: true,
        },
        {
          text: ' text adds a vibrant touch to your document, making important information pop off the page.',
        },
      ],
    },
    {
      children: [
        {
          text: '',
        },
      ],
    },
    {
      type: 'h2',
      children: [
        {
          text: 'Quotes',
        },
      ],
    },
    {
      children: [
        {
          text: 'Share inspirational quotes that inspires others!',
        },
      ],
    },
    {
      children: [
        {
          text: 'Biryani is love❤️',
        },
      ],
      type: 'blockquote',
    },
    {
      children: [
        {
          text: '',
        },
      ],
    },
    {
      type: 'h2',
      children: [
        {
          text: 'Lists',
        },
      ],
    },
    {
      children: [
        {
          text: 'Unordered List:',
          strong: true,
        },
      ],
    },
    {
      type: 'ul',
      children: [
        {
          type: 'li',
          children: [
            {
              text: 'Grocery shopping',
            },
          ],
        },
        {
          type: 'li',
          children: [
            {
              text: 'Complete work assignments',
            },
          ],
        },
        {
          type: 'li',
          children: [
            {
              text: 'Exercise routine',
            },
          ],
        },
        {
          type: 'li',
          children: [
            {
              text: 'Call a friend',
            },
          ],
        },
      ],
    },
    {
      children: [
        {
          text: '',
        },
      ],
    },
    {
      children: [
        {
          text: 'Ordered List:',
          strong: true,
        },
      ],
    },
    {
      type: 'ol',
      children: [
        {
          children: [
            {
              text: 'Grocery Shopping',
            },
          ],
          type: 'li',
        },
        {
          type: 'li',
          children: [
            {
              text: 'Complete work assignments',
            },
          ],
        },
        {
          type: 'li',
          children: [
            {
              text: 'Call a friend',
            },
          ],
        },
        {
          type: 'li',
          children: [
            {
              text: 'Exercise routine',
            },
          ],
        },
      ],
    },
    {
      children: [
        {
          text: '\nImages',
        },
      ],
      type: 'h2',
    },
    {
      children: [
        {
          text: 'Supports custom images, helps to make your content standout!\n',
        },
      ],
    },
    {
      children: [
        {
          text: '',
        },
      ],
      type: 'upload',
      relationTo: 'media',
      value: {
        id,
      },
    },
    {
      children: [
        {
          text: '',
        },
      ],
    },
    {
      children: [
        {
          text: '',
        },
      ],
    },
    {
      children: [
        {
          text: 'Code',
        },
      ],
      type: 'h2',
    },
    {
      children: [
        {
          text: 'Unleash the power of simplicity with our user-friendly code block feature. It may be straightforward, but its simplicity is its strength, offering an efficient and practical way to showcase your code snippets effortlessly on your blog.',
        },
      ],
    },
    {
      type: 'code',
      children: [
        {
          text: 'function myLifeCycle() {\n    if (isAlive($me)) {\n        eat($me);\n        sleep($me);\n        code($me);\n        myLifeCycle();\n    }\n}\n\n// Start life cycle\nmyLifeCycle();',
          pre: true,
        },
      ],
    },
    {
      children: [
        {
          text: '',
        },
      ],
    },
    {
      children: [
        {
          text: 'Key Bindings',
        },
      ],
      type: 'h2',
    },
    {
      children: [
        {
          text: 'You can add the key bindings ex: ',
        },
        {
          text: 'ctrl + ⌘ ',
          kbd: true,
        },
        {
          text: 'or ',
        },
        {
          text: 'enter',
          kbd: true,
        },
      ],
    },
    {
      children: [
        {
          text: '',
        },
      ],
    },
    {
      children: [
        {
          text: 'Embedding',
        },
      ],
      type: 'h2',
    },
    {
      children: [
        {
          text: 'Add customised embedding to your site example: Youtube, Spotify etc...',
        },
      ],
    },
    {
      children: [
        {
          text: '',
        },
      ],
    },
    {
      children: [
        {
          text: 'Youtube embed👇',
        },
      ],
    },
    {
      children: [
        {
          text: 'https://www.youtube.com/embed/c5OPn_dyNcc?si=lNRNBNG9_13nlq09',
          'custom-iframe': true,
        },
      ],
    },
    {
      children: [
        {
          text: '',
        },
      ],
    },
    {
      children: [
        {
          text: '',
        },
      ],
    },
    {
      children: [
        {
          text: 'Spotify embed👇',
        },
      ],
    },
    {
      type: 'code',
      children: [
        {
          text: 'https://open.spotify.com/embed/track/5zCnGtCl5Ac5zlFHXaZmhy?utm_source=generator&theme=0',
          'custom-iframe': true,
        },
      ],
    },
  ],
}

export const dynamicAccessBlogData = {
  title: 'Dynamic access in JavaScript',
  alt: 'Dynamic access in JavaScript image',
  description:
    'This blog helps you to understand dynamic object access in javascript',
  authorsList: ['mimi-thian'],
  tagsList: ['javascript', 'coding'],
  slug: 'dynamic-access-in-javascript',
  posterURL: path.join(
    process.cwd(),
    '/public/images/seed/blog-dynamic-access-in-javascript.avif',
  ),
  contentAlt: 'Avatars image',
  contentURL: path.join(
    process.cwd(),
    '/public/images/seed/blog-dynamic-access-profile.avif',
  ),
  content: (id: number) => [
    {
      children: [
        {
          text: "Hi there👋 in this blog post, you'll learn how to access a value inside the object dynamically in JS.",
        },
      ],
    },
    {
      children: [
        {
          text: "Let's first start by example of showing different background color for user avatar icon.\n\n",
        },
      ],
    },
    {
      type: 'upload',
      children: [
        {
          text: ' ',
        },
      ],
      relationTo: 'media',
      value: {
        id,
      },
    },
    {
      children: [
        {
          text: '',
        },
      ],
    },
    {
      children: [
        {
          text: "\n1.  Here i've created a object and hardcoded few color values",
        },
      ],
    },
    {
      type: 'code',
      children: [
        {
          text: "const avatarColors = {\n    'a': '#FF5733',\n    'b': '#33FF57',\n    'c': '#3357FF',\n    // Add more users and colors as needed\n};",
          pre: true,
        },
      ],
    },
    {
      children: [
        {
          text: '\n',
        },
      ],
    },
    {
      type: 'ol',
      children: [
        {
          type: 'li',
          children: [
            {
              children: [
                {
                  text: 'Assume that my username is coming from an API call',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'code',
      children: [
        {
          text: "// Here is an example of API\nconst fetchUser = async() => {  \ntry {    \n   const response = await fetch('https://someurl');    \n   return await response.json();  \n} catch (error) {    \n   throw error  \n}}\n",
          pre: true,
        },
      ],
    },
    {
      children: [
        {
          text: '',
        },
      ],
    },
    {
      type: 'ol',
      children: [
        {
          type: 'li',
          children: [
            {
              children: [
                {
                  text: "Now i'll call the API and get the user data",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'code',
      children: [
        {
          text: "const avatarColors = {    \n    'a': '#FF5733',\n    'b': '#33FF57',\n    'c': '#3357FF',\n    // Add more users and colors as needed\n};",
          pre: true,
        },
      ],
    },
    {
      type: 'code',
      children: [
        {
          pre: true,
          text: "\nconst data = await fetchUser();\n\n// now i've the user details in the data variable\nconst userName = data?.name;\n\n// now let's store the user initial in a variable\nif (userName) {  \n// here i'll getting the first letter of there name and converting to lowercase\n\nconst initial = userName.slice(0,1).toLowerCase();\n// now next step is to access the color\n\nconst color = avatarColors[initial]; // 👈 this is dynamic access\n// added undefined check\n\nif (color) {    \n// now assume i've a element in HTML code    \nconst element = document.getElementById(\"user-avatar\");\n       \n// I'm setting the element background color    \nelement.style.background = color;  \n}}",
        },
      ],
    },
    {
      children: [
        {
          text: '\n',
        },
      ],
    },
    {
      children: [
        {
          text: "In the above code i've used the avatar color as an example. You can use instead of switch to avoid some boiler-code also",
        },
      ],
    },
    {
      children: [
        {
          text: '\n',
        },
      ],
    },
    {
      children: [
        {
          text: 'Check this out for reference👇',
        },
      ],
    },
    {
      children: [
        {
          text: '',
        },
        {
          type: 'link',
          newTab: true,
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors',
          children: [
            {
              text: 'MDN Docs',
            },
          ],
          linkType: 'custom',
        },
        {
          text: '',
        },
      ],
    },
    {
      children: [
        {
          text: '\n',
        },
      ],
    },
    {
      children: [
        {
          text: 'Thank you, happy coding!',
        },
      ],
    },
    {
      children: [
        {
          text: '',
        },
      ],
    },
  ],
}
