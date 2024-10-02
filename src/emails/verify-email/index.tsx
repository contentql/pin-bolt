import { env } from '@env'
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  render,
} from '@react-email/components'

interface UserEmailTemplateProps {
  actionLabel: string
  buttonText: string
  userName: string
  href: string
  image: string
}

export const VerifyEmailTemplate = ({
  actionLabel,

  buttonText,
  userName,
  href,
}: UserEmailTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>{actionLabel}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section>
            <Row style={header}>
              <Column>
                <Img
                  src={`${env.PAYLOAD_URL}/favicon.ico`}
                  width='40'
                  height='40'
                  alt='ContentQL'
                />
              </Column>
              <Column>
                <Text style={title}>ContentQL</Text>
              </Column>
            </Row>
            <Hr style={hr} />
          </Section>
          <Section style={infoSection}>
            <Text style={infoText}>Hello, {userName}</Text>

            <Text style={infoText}>
              Thank you for signing up! You are just one step away from
              accessing your account. Please verify your email address to
              complete the registration.
            </Text>

            <Button href={href} style={button}>
              {buttonText}
            </Button>

            <Text style={infoText}>
              If the button above doesn’t work, copy and paste the following
              link into your browser:
              <Link href={href}>link</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export const UserAccountVerification = (props: UserEmailTemplateProps) =>
  render(<VerifyEmailTemplate {...props} />, { pretty: true })

const infoSection = {
  marginBottom: '24px',
}

const header = {
  display: 'flex',
  alignItems: 'center',
  paddingTop: '10px',
}

const title = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#f1f5f9',
  marginLeft: '10px',
}

const main = {
  backgroundColor: '#fff',
  color: '#f1f5f9',
  margin: 'auto',
  padding: '10px 0px',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
}

const container = {
  maxWidth: '600px',
  backgroundColor: '#0f172a',
  margin: 'auto',
  padding: '24px',
}

const hr = {
  borderColor: '#334155',
  margin: '20px 0',
}

const infoText = {
  margin: '0 0 10px 0',
  fontSize: '14px',
  color: '#f1f5f9',
  textAlign: 'left' as const,
}

const button = {
  fontSize: '16px',
  backgroundColor: '#8b5cf6',
  color: '#f1f5f9',
  lineHeight: 1.5,
  borderRadius: '8px',
  padding: '12px 24px',
  transition: 'background-color 0.2s ease-in-out',
  marginTop: '8px',
  marginBottom: '8px',
}
