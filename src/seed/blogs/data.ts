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
