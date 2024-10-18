import { RequiredDataFromCollectionSlug } from 'payload'

export type FormsDataType = RequiredDataFromCollectionSlug<'forms'>

export const formsData: FormsDataType[] = [
  {
    title: 'Contact Form',
    fields: [
      {
        blockType: 'text',
        name: 'firstName',
        label: 'First Name',
        required: true,
        blockName: 'First Name',
        width: 50,
      },
      {
        blockType: 'text',
        name: 'lastName',
        label: 'Last Name',
        required: false,
        blockName: 'Last Name',
        width: 50,
      },
      {
        blockType: 'email',
        name: 'email',
        label: 'Email',
        required: true,
        blockName: 'Email',
        width: 100,
      },

      {
        blockType: 'number',
        name: 'phoneNumber',
        label: 'Phone Number',
        required: false,
        blockName: 'Phone Number',
        width: 50,
      },

      {
        blockType: 'country',
        name: 'country',
        label: 'Country',
        required: false,
        blockName: 'Phone Number',
        width: 50,
      },
      {
        blockType: 'text',
        name: 'subject',
        label: 'Subject',
        required: true,
        blockName: 'Subject',
        width: 100,
      },
      {
        blockType: 'textarea',
        name: 'message',
        label: 'Message',
        required: true,
        blockName: 'Message',
        width: 100,
      },
      {
        blockType: 'checkbox',
        name: 'privacy',
        label:
          'I agree that my contact details may be used for future communication.',
        required: true,
        blockName: 'Privacy',
        width: 100,
      },
    ],
    emails: [
      {
        emailTo: '{{email}}',
        subject: "We've Received Your Message!",
        message: [
          {
            children: [
              {
                text: 'Dear {{firstName}}',
              },
            ],
          },
          {
            children: [
              {
                text: 'Thank you for contacting us! We have received your message and our team will get back to you as soon as possible.',
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
                text: 'If you have any additional information to provide or further inquiries, please feel free to respond to this email.',
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
                text: 'We appreciate your patience and look forward to assisting you.',
              },
            ],
          },
        ],
      },
      {
        subject: 'New Contact Form Submission.',
        emailTo: 'admin@bolt.com',
        message: [
          {
            children: [
              {
                text: '\nHi Admin',
              },
            ],
          },
          {
            children: [
              {
                text: 'I hope this message finds you well.',
              },
            ],
          },
          {
            children: [
              {
                text: 'We have received a new contact form submission from a user. Here are the details:',
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
                    text: 'Name:',
                    bold: true,
                  },
                  {
                    text: ' {{firstName}}',
                  },
                ],
              },
              {
                type: 'li',
                children: [
                  {
                    text: 'Email: {{email}}',
                    bold: true,
                  },
                ],
              },
              {
                type: 'li',
                children: [
                  {
                    text: 'Phone Number:',
                    bold: true,
                  },
                  {
                    text: ' {{phoneNumber}}',
                  },
                ],
              },
              {
                type: 'li',
                children: [
                  {
                    text: 'Subject: {{subject}}',
                  },
                ],
              },
              {
                type: 'li',
                children: [
                  {
                    text: 'Message:',
                    bold: true,
                  },
                  {
                    text: ' {{message}}',
                  },
                ],
              },
            ],
          },
          {
            children: [
              {
                text: 'Please take the necessary actions to respond to the user.',
              },
            ],
          },
          {
            children: [
              {
                text: 'If you need any additional information, feel free to reach out.',
              },
            ],
          },
          {
            children: [
              {
                text: '\n\n',
              },
            ],
          },
        ],
      },
    ],
    submitButtonLabel: 'Submit',
    confirmationType: 'message',
    confirmationMessage: [
      {
        children: [
          {
            text: 'Thanks for contacting us',
          },
        ],
      },
    ],
  },
  {
    title: 'Newsletter Form',
    fields: [
      {
        blockType: 'text',
        name: 'firstName',
        label: 'First Name',
        required: true,
        blockName: 'First Name',
        width: 100,
      },

      {
        blockType: 'email',
        name: 'email',
        label: 'Email',
        required: true,
        blockName: 'Email',
        width: 100,
      },
    ],
    submitButtonLabel: 'Subscribe',
    confirmationType: 'message',
    confirmationMessage: [
      {
        children: [
          {
            text: 'Thanks for Subscribing!',
          },
        ],
      },
    ],
  },
]
