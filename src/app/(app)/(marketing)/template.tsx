import ScrollUp from '@/utils/ScrollUp'

// template will be rendered on route change this will make page scroll up
const Template = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}

      <ScrollUp />
    </>
  )
}

export default Template
