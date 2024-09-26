import path from 'path'
import { RequiredDataFromCollectionSlug } from 'payload'

export type BlogDataType = RequiredDataFromCollectionSlug<'blogs'>
export type BlogImageType = {
  alt: string
  filePath: string
}

export const blogsData: BlogDataType[] = [
  {
    selectBlogSize: '1',
    title: 'Will AI-Enabled Processors Spark a PC Supercycle This Year?',
    slug: 'will-ai-enabled-processors-spark-a-pc-supercycle-this-year',
    subTitle:
      'AI-enabled processors could drive a PC supercycle this year by significantly boosting performance and enabling advanced applications. This innovation is expected to stimulate demand in both consumer and enterprise markets',
    blogImage: '',
    content: [
      {
        children: [
          {
            text: 'Artificial intelligence (AI) has heralded the start of a technological revolution. This frenzy questions whether AI will, in the next year or two, set in motion a desktop and laptop “supercycle.”',
          },
        ],
      },
      {
        children: [
          {
            text: 'A supercycle period is marked by a significant surge in PC sales and upgrades, driven by compelling advancements in technology that persuade consumers and businesses to update their hardware at an accelerated pace.',
          },
        ],
      },
      {
        children: [
          {
            text: 'Given the flattening of overall sales since Covid-19 ended, the PC industry could sure use it.',
          },
        ],
      },
      {
        children: [
          {
            text: 'Like any transformational technology, AI’s effects on consumer and corporate markets are complex and require a comprehensive analysis.',
          },
        ],
      },
      {
        children: [
          {
            text: 'Prominent PC CEOs have shown off new notebook PCs with AI-embedded mobile processors for months. Intel, AMD, and Qualcomm are incorporating this new technology into their products this year and beyond.',
          },
        ],
      },
      {
        children: [
          {
            text: 'Many industry experts predict AI PCs will start a supercycle upgrade phenomenon in the second half of the year when more AI PCs hit the market. But is this likely?',
          },
        ],
      },
      {
        children: [
          {
            text: 'Recently, Intel and its partners showcased AI PCs equipped with on-device generative AI capabilities for enhancing photographs, movies, and presentations. These devices also feature real-time language and speech translation, effectively eliminating communication barriers.',
          },
        ],
      },
      {
        children: [
          {
            text: 'However, removing emotion from the equation, the supercycle upgrade phenomenon may be more muted than many expect despite the hype.',
          },
        ],
      },
      {
        type: 'h3',
        children: [
          {
            text: 'Consumer Market Dynamics',
          },
        ],
      },
      {
        children: [
          {
            text: 'AI, particularly gen AI cloud-based applications like OpenAI’s ChatGPT and Google’s Gemini, has been wildly popular among desktop and laptop users. While these apps do not require a dedicated AI processor, we expect customers to upgrade to newer computer models as AI-powered features such as voice assistants, predictive text, and image recognition enhance PC usability.',
          },
        ],
      },
      {
        children: [
          {
            text: 'Proponents claim that as AI algorithms improve, they will uncover myriad applications that require more computational power, leading people to buy more powerful PCs and laptops. There is logic in this thought process, as AI-driven gaming and immersive VR apps may increase demand for high-performance computer hardware.',
          },
        ],
      },
      {
        children: [
          {
            text: 'However, skeptics argue that AI may improve user experiences but not be an overwhelming catalyst for sales. The commoditization of basic AI functions across many devices may reduce user motivation to update. Moreover, economic uncertainty stemming from inflation and high interest rates may limit discretionary IT upgrade investments.',
          },
        ],
      },
      {
        type: 'h3',
        children: [
          {
            text: 'Corporate Customers Slow To Adopt Arm Flavors of Windows',
          },
        ],
      },
      {
        children: [
          {
            text: 'Compatibility issues have historically kept enterprise clients from adopting the Arm version of Windows. Many enterprise processes depend on x86-optimized software and apps. Adapting these vital tools to Arm platforms requires substantial testing, rebuilding, or replacement. Such projects are resource-intensive and may disrupt workflow.',
          },
        ],
      },
      {
        children: [
          {
            text: 'The seamless integration of Arm devices with enterprise infrastructure, including peripheral devices and management systems, hasn’t been as smooth as many customers would have liked over the past few years. This compatibility gap (especially at the app level) has deterred organizations from investing in Arm-based Windows solutions.',
          },
        ],
      },
      {
        children: [
          {
            text: 'A fear of performance parity and optimization on Arm architecture also contributes to enterprise hesitance. While Arm processor technology has improved, reservations remain about their ability to match x86 processors in resource-intensive activities.',
          },
        ],
      },
      {
        children: [
          {
            text: 'Businesses that depend on fast and reliable computer performance have been cautious about switching to Arm-based Windows machines. However, over the past two years, Microsoft has begun providing assurances of equivalent or greater performance levels and improved compatibility with the existing software ecosystem to reduce enterprise client hesitance to adopt Arm versions of Windows.',
          },
        ],
      },
      {
        children: [
          {
            text: 'The latest Arm Windows 11 builds reportedly have greatly improved program compatibility, performance, and battery life.',
          },
        ],
      },
      {
        type: 'h3',
        children: [
          {
            text: 'Qualcomm’s Snapdragon X Elite Stands Out',
          },
        ],
      },
      {
        children: [
          {
            text: 'Qualcomm is banking on its new and improved mobile computing offerings, which offer best-in-class performance and efficiency that could be a tailwind for the chip manufacturer in this PC upgrade supercycle.',
          },
        ],
      },
      {
        children: [
          {
            text: 'If recent benchmark results are accurate, its new Snapdragon X Elite offering, announced a few months ago, positions the company as the clear leader in the AI-enabled silicon space against Intel, AMD, and even Apple. It’s worth noting that Apple released its latest M3 chipsets days after Qualcomm introduced its Snapdragon X Elite.',
          },
        ],
      },
    ],

    _status: 'published',

    author: [
      {
        relationTo: 'users',
        value: '',
      },
    ],
    tags: [
      {
        relationTo: 'tags',
        value: '',
      },
    ],
  },
  {
    selectBlogSize: '2',
    title:
      'I Created a Viral Tech Blog from Scratch and Sold It for Six Figures: My Journey',
    slug: 'i-created-a-viral-tech-blog-from-scratch-and-sold-it-for-six-figures-my-journey',
    subTitle:
      'Creating a viral tech blog from scratch and selling it for six figures involved identifying trending tech topics, producing engaging content, and leveraging SEO and social media strategies to grow the audience.',
    blogImage: '',
    content: [
      {
        children: [
          {
            text: 'As is typically the case when one company jumps ahead of the others, analysts like me get asked what makes Nvidia so much more successful than its peers. While my peers may have different answers, I think there is one predominant cause for this success: Nvidia’s CEO, Jensen Huang.',
          },
        ],
      },
      {
        children: [
          {
            text: 'Huang has had three clear advantages that most other CEOs lack. First, Huang’s technical proficiency allows him to set and execute a vision. Second, Huang is a founder, which typically grants unusual loyalty and power over the company. Finally, he is the longest-serving tech CEO in recent history.',
          },
        ],
      },
      {
        children: [
          {
            text: 'I say “recent history” because Nvidia is around 30 years old, and IBM’s first CEO and founder, Thomas Watson, served for 42 years during a time when IBM pretty much ',
          },
          {
            text: 'was',
            italic: true,
          },
          {
            text: ' the tech industry and was even more successful than Nvidia is now.',
          },
        ],
      },
      {
        children: [
          {
            text: 'Thomas Watson had the same three advantages as Huang. When Watson’s son, Thomas Watson, Jr., took over, he inherited those same advantages and took IBM to even greater levels by being additive. Huang has a son, Spencer, who works at Nvidia, but his true heir is AI, suggesting it could be either his or Spencer’s successor. Let’s talk about that this week.',
          },
        ],
      },
      {
        children: [
          {
            text: 'We’ll close with my Product of the Week, my new favorite smartphone, the Google Pixel Fold.',
          },
        ],
      },
      {
        type: 'h3',
        children: [
          {
            text: 'Why the CEO Job Is Broken: The Overcompensation Problem',
          },
        ],
      },
      {
        children: [
          {
            text: 'CEOs are overcompensated, and this creates significant financial and operational problems in both public and private companies. CEOs weren’t always the highest-paid positions.',
          },
        ],
      },
      {
        children: [
          {
            text: 'When I first entered the tech field, one of my jobs was managing compensation, and some of our sales reps made significantly more than the founding CEO. Granted, founders had founder stock, which eventually raised the CEO’s compensation when that stock was sold. But unlike today, CEO compensation wasn’t massively higher than that of other executives. Today’s CEOs are overcompensated, and that leads to three big problems:',
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
                text: 'The disparity creates friction among employees who feel they are doing the work while the CEO gets all the rewards. This situation is particularly problematic when a CEO institutes a layoff or salary reduction plan, and the employees feel they are being treated unfairly, given the CEO, even with salary cuts, is making crazy money. This reduces loyalty to the CEO, making the company less efficient and key employees less likely to remain with the company.',
              },
            ],
          },
          {
            type: 'li',
            children: [
              {
                text: 'The CEO is motivated to acquire things that, in turn, need to be managed, detracting from doing the job they are paid to do. Some CEOs have multiple mansions, yachts, and rare car collections that are all enviable, but these things have to be managed and take away time from the CEO’s ability to do the job they were hired for. This additionally exacerbates the feeling in the rank and file that the CEO is taking advantage of them, particularly when cutbacks occur.',
              },
            ],
          },
          {
            type: 'li',
            children: [
              {
                text: 'This overcompensation can convey a feeling that the CEO can do whatever they want. They are so used to having crazy money and extreme authority that they get the idea that rules don’t apply to them and discover the hard way that some rules do. CEOs getting fired for misogyny, mishandling of company assets, and other types of misbehavior are common and very disruptive to the company.',
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
    ],

    _status: 'published',

    author: [
      {
        relationTo: 'users',
        value: '',
      },
    ],
    tags: [
      {
        relationTo: 'tags',
        value: '',
      },
    ],
  },
  {
    selectBlogSize: '1',
    title: 'Standout Tech Products of 2023',
    slug: 'standout-tech-products-of-2023',
    subTitle:
      'Standout tech products of 2023 include the Apple Vision Pro, a cutting-edge mixed reality headset; the Tesla Model S Plaid, featuring advanced autonomous driving capabilities; the Nvidia RTX 4090 GPU, delivering unprecedented graphics performance.',
    blogImage: '',
    content: [
      {
        children: [
          {
            text: 'Wow, this year sure went by quickly. As 2024 fast approaches, it’s time to name my Product of the Year.',
          },
        ],
      },
      {
        children: [
          {
            text: 'Only one product stands so far above the rest in terms of impact that the choice was unusually easy. I could say I doubt this will happen again, but given how quickly things are moving, this may be true several times this decade.',
          },
        ],
      },
      {
        children: [
          {
            text: 'Let’s start with the contenders that did not make it to the top of my list, and I’ll conclude with the one product that did.',
          },
        ],
      },
      {
        type: 'h3',
        children: [
          {
            text: 'Tesla Cybertruck',
          },
        ],
      },
      {
        children: [
          {
            text: '(Image Courtesy of Tesla, Inc.)',
          },
        ],
      },
      {
        children: [
          {
            text: 'The ',
          },
          {
            type: 'link',
            newTab: true,
            url: 'https://www.tesla.com/cybertruck',
            children: [
              {
                text: 'Tesla Cybertruck',
              },
            ],
          },
          {
            text: ' is incredibly disruptive. It combines the best electric vehicle technology currently available in the U.S. with what is likely the hottest design to hit the market since the ',
          },
          {
            type: 'link',
            newTab: true,
            url: 'https://en.wikipedia.org/wiki/Pontiac_Aztek#',
            children: [
              {
                text: 'Pontiac Aztek',
              },
            ],
          },
          {
            text: '.',
          },
        ],
      },
      {
        children: [
          {
            text: 'This pickup truck can outperform sports cars and even most street cars set up for drag racing. But it is immensely impractical as a pickup truck and unacceptable to most drivers who have previously been wedded to the Ford F-150.',
          },
        ],
      },
      {
        children: [
          {
            text: 'I was tempted to order the Cybertruck just to experience the amazing technology but ended up going with the far more practical and better-looking Fisker Ocean.',
          },
        ],
      },
      {
        type: 'h3',
        children: [
          {
            text: 'Fisker Ocean',
          },
        ],
      },
      {
        children: [
          {
            text: '(Image Credit: Fisker)',
          },
        ],
      },
      {
        children: [
          {
            text: 'The ',
          },
          {
            type: 'link',
            newTab: true,
            url: 'https://www.fiskerinc.com/ocean',
            children: [
              {
                text: 'Fisker Ocean',
              },
            ],
          },
          {
            text: ' is, in my opinion, the best SUV-based electric vehicle in the U.S. Market. It isn’t as fast as the Cybertruck, but as mentioned, it is much more practical and better looking.',
          },
        ],
      },
      {
        children: [
          {
            text: 'With an impressive 360-mile range, this truck should be ideal for most electric vehicle buyers. It has several unique features like California Mode, where you can open up the top and all the windows with one button.',
          },
        ],
      },
      {
        children: [
          {
            text: 'It has little dog windows in the back that open, a table for the driver, and solar panels all over the roof so the vehicle can charge itself in the sun, potentially giving you more power when you get back to the airport after a plane trip than you had when you first arrived.',
          },
        ],
      },
      {
        children: [
          {
            text: '\n\n\n\n',
          },
        ],
      },
    ],

    _status: 'published',

    author: [
      {
        relationTo: 'users',
        value: '',
      },
    ],
    tags: [
      {
        relationTo: 'tags',
        value: '',
      },
    ],
  },
  {
    selectBlogSize: '1',
    title: 'CoordinateHQ Takes the Noise Out of Project Management Systems',
    slug: 'coordinatehq-takes-the-noise-out-of-project-management-systems',
    subTitle:
      'CoordinateHQ streamlines project management by reducing clutter and enhancing focus through intuitive interfaces and intelligent task prioritization. By integrating seamlessly with existing tools and employing AI-driven insights, it simplifies collaboration and boosts team productivity',
    blogImage: '',
    content: [
      {
        children: [
          {
            text: 'Project management (PM) software might be on its way to becoming an underappreciated technology gem across industries and enterprise environments. Analysts expect that by 2030, the market will exceed US$15.08 billion with a compound average growth rate of 10.68%.',
          },
        ],
      },
      {
        children: [
          {
            text: 'PM software helps organize time and resource management, creates business and employee performance reports, and better connects managers and leaders with strategy effectiveness. These platforms can also facilitate team collaboration.',
          },
        ],
      },
      {
        children: [
          {
            text: 'Not all PM platforms, however, are the same. Coordinate developed its product ',
          },
          {
            type: 'link',
            newTab: true,
            url: 'https://www.coordinatehq.com/',
            children: [
              {
                text: 'CoordinateHQ',
              },
            ],
          },
          {
            text: ' to deliver project management and universal collaboration through a simple client portal experience. The software removes the complexity and inefficiencies inherent in established PM solutions, making it easier for hybrid teams and their clients to work together.',
          },
        ],
      },
      {
        children: [
          {
            text: 'CoordinateHQ does this by eliminating the friction of communicating with a client through a mix of email, spreadsheets, and messaging tools while trying to ensure teams execute and deliver. It also streamlines communication and automates processes for client service organizations to drive alignment and scale. In addition, CoordinateHQ integrates with other software like HubSpot.',
          },
        ],
      },
      {
        children: [
          {
            text: 'The project management market will continue to evolve in 2024 and beyond. It will produce innovations and new products that help companies break through the noise instead of adding to it, according to Rick Morrison, co-founder and CEO of CoordinateHQ.',
          },
        ],
      },
      {
        children: [
          {
            text: '“It will continue to be noisy. We’re going to see tools arise that help teams work better together, especially across organizations, functional areas, and geographies,” Morrison told TechNewsWorld.',
          },
        ],
      },
      {
        type: 'h3',
        children: [
          {
            text: 'Upstart Innovator on the Move',
          },
        ],
      },
      {
        children: [
          {
            text: 'Morrison started his company to address a need he had personally experienced. Initially, the startup over-indexed on helping companies keep their clients’ goals a key priority. The founders then expanded into project management between clients and their customers.',
          },
        ],
      },
      {
        children: [
          {
            text: '“The first live customers came in 2021. We have customers that have grown 10 times the size of their team, enabled by CoordinateHQ,” offered Morrison.',
          },
        ],
      },
      {
        children: [
          {
            text: 'In 2023, the company added features to help entire teams. These included automation via templates and workflows, improved UI, forms, time tracking, white label capabilities, e-signatures, and many more, all driven by its customers.',
          },
        ],
      },
      {
        children: [
          {
            text: '“We started seeing real customer growth by revenue and customer count in 2022. We 4x’d revenue in 2023. In 2024, we’re continuing to partner with our customers to dictate product direction to make their lives easier,” said Morrison.',
          },
        ],
      },
      {
        type: 'h3',
        children: [
          {
            text: 'Peeling Back the Project Management Curtain',
          },
        ],
      },
      {
        children: [
          {
            text: 'We asked Morrison to share his insight into what awaits around the corner and why project management can be an organization’s secret weapon.',
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

    _status: 'published',

    author: [
      {
        relationTo: 'users',
        value: '',
      },
    ],
    tags: [
      {
        relationTo: 'tags',
        value: '',
      },
    ],
  },
]
export const blogsImagesData: BlogImageType[] = [
  {
    alt: 'Blog 1',
    filePath: path.join(process.cwd(), '/public/images/seed/blog-1.jpg'),
  },
  {
    alt: 'Blog 2',
    filePath: path.join(process.cwd(), '/public/images/seed/blog-2.jpg'),
  },
  {
    alt: 'Blog 3',
    filePath: path.join(process.cwd(), '/public/images/seed/blog-3.jpg'),
  },
  {
    alt: 'Blog 4',
    filePath: path.join(process.cwd(), '/public/images/seed/blog-4.jpg'),
  },
  {
    alt: 'Blog 5',
    filePath: path.join(process.cwd(), '/public/images/seed/blog-5.jpg'),
  },
  {
    alt: 'Blog 6',
    filePath: path.join(process.cwd(), '/public/images/seed/blog-6.jpg'),
  },
]
