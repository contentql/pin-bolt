import { User } from '@payload-types'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { LogOut, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/common/Accordion'
import { GenerateMenuLinksType } from '@/utils/generateMenuLinks'

import { Avatar, AvatarFallback, AvatarImage } from './common/Avatar'

const variants = {
  visible: { opacity: 1, scale: 1 },
  hidden: { opacity: 0, scale: 0.5 },
}

type HamburgerMenuType = {
  data: User | undefined
  userDetails: {
    url:
      | {
          src: string
          alt: string
        }
      | undefined
    name: string
    isAdmin: boolean
  }
  navLinks: GenerateMenuLinksType[]
  initials: string
  handleSignOut: () => void
}

const HamburgerMenu = ({
  data,
  userDetails,
  navLinks,
  initials,
  handleSignOut,
}: HamburgerMenuType) => {
  const [open, setOpen] = useState(false)

  const resizeListener = () => {
    if (window.innerWidth >= 1024) {
      setOpen(false)
    }
  }

  // on-resize if the menu is open closing it on laptop view
  useEffect(() => {
    window.addEventListener('resize', resizeListener)

    return () => {
      window.removeEventListener('resize', resizeListener)
    }
  }, [])

  return (
    <>
      <button
        className='z-[70] lg:hidden'
        aria-label='Menu'
        onClick={() => setOpen(current => !current)}>
        <MotionConfig transition={{ duration: 0.15 }}>
          <AnimatePresence initial={false} mode='wait'>
            {open ? (
              <motion.div
                animate='visible'
                exit='hidden'
                initial='hidden'
                key='close'
                variants={variants}>
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                animate='visible'
                exit='hidden'
                initial='hidden'
                key='open'
                variants={variants}>
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </MotionConfig>
      </button>

      <aside
        className={`fixed right-0 top-0 h-screen w-full max-w-md border-l bg-background px-4 pb-4 pt-16 transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        {data && (
          <div className='mx-3 mb-4 border-b pb-6'>
            <div className='flex items-center gap-4'>
              <Avatar className='size-10'>
                <AvatarImage src={userDetails.url?.src} alt='user-profile' />
                <AvatarFallback className='text-sm'>{initials}</AvatarFallback>
              </Avatar>

              <div className='mt-2'>
                <p className='leading-3'>{userDetails.name}</p>
                <Link
                  href='/profile'
                  onClick={() => setOpen(false)}
                  className='text-sm leading-3 text-primary hover:text-primary/80'>
                  View profile
                </Link>
              </div>
            </div>
          </div>
        )}

        {navLinks?.length > 0 && (
          <ul className='space-y-4'>
            {navLinks.map(({ label, children, href = '', newTab }) => {
              return (
                <li className='flex list-none items-center gap-1' key={label}>
                  {children ? (
                    <Accordion type='single' collapsible className='w-full'>
                      <AccordionItem value='item-1' className='border-none'>
                        <AccordionTrigger className='px-3 py-2 hover:no-underline'>
                          {label}
                        </AccordionTrigger>
                        <AccordionContent className='p-0'>
                          {children
                            ? children.map(details => (
                                <li
                                  className='flex list-none items-center gap-1'
                                  key={details.label}>
                                  <Link
                                    key={details.label}
                                    href={details.href}
                                    onClick={() => setOpen(false)}
                                    className='w-full rounded px-3 py-2 transition-colors hover:bg-secondary/10'
                                    target={
                                      details.newTab ? '_blank' : '_self'
                                    }>
                                    {details.label}
                                  </Link>
                                </li>
                              ))
                            : null}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : (
                    <Link
                      href={href}
                      onClick={() => setOpen(false)}
                      className='w-full rounded px-3 py-2 transition-colors hover:bg-secondary/10'
                      target={newTab ? '_blank' : '_self'}>
                      {label}
                    </Link>
                  )}
                </li>
              )
            })}

            {data && (
              <li className='flex list-none items-center gap-1'>
                <p
                  onClick={handleSignOut}
                  className='flex w-full cursor-pointer items-center gap-1 rounded px-3 py-2 transition-colors hover:bg-secondary/10'>
                  <LogOut size={16} className='mr-2' />
                  Log out
                </p>
              </li>
            )}
          </ul>
        )}
      </aside>
    </>
  )
}

export default HamburgerMenu
