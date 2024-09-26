'use client'

import { User } from '@payload-types'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/navigation'
import React, { createContext, useContext, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { IoMdArrowBack } from 'react-icons/io'
import { IoReorderThree } from 'react-icons/io5'
import { RxCross2 } from 'react-icons/rx'

import { cn } from '@/utils/cn'
import { signOut } from '@/utils/signOut'

interface Links {
  label: string
  href: string
  icon: React.JSX.Element | React.ReactNode
}

interface SidebarContextProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  animate: boolean
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined)

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode
  open?: boolean
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
  animate?: boolean
}) => {
  const [openState, setOpenState] = useState(false)

  const open = openProp !== undefined ? openProp : openState
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode
  open?: boolean
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
  animate?: boolean
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  )
}

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<'div'>)} />
    </>
  )
}

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar()
  return (
    <>
      <motion.div
        className={cn(
          'hidden h-full w-[300px]  flex-shrink-0 bg-base-200 px-4 py-4 text-base-content md:flex md:flex-col',
          className,
        )}
        animate={{
          width: animate ? (open ? '300px' : '60px') : '300px',
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        {...props}>
        {children}
      </motion.div>
    </>
  )
}

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) => {
  const { open, setOpen } = useSidebar()
  return (
    <>
      <div
        className={cn(
          'flex h-16 w-full flex-row items-center  justify-between bg-base-100 px-4 py-4 md:hidden',
        )}
        {...props}>
        <div className='z-20 flex w-full justify-end '>
          <IoReorderThree
            size={28}
            className='font-bold text-base-content'
            onClick={() => setOpen(!open)}
          />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: 'easeInOut',
              }}
              className={cn(
                'fixed inset-0 z-50 flex h-full w-full flex-col justify-between bg-base-100 p-10 text-base-content',
                className,
              )}>
              <div
                className='absolute right-8 top-8 z-50'
                onClick={() => setOpen(!open)}>
                <RxCross2 size={28} className='font-bold ' />
              </div>
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export const SidebarLink = ({
  link,
  className,
  ...props
}: {
  link: Links
  className?: string
  props?: LinkProps
}) => {
  const { open, animate } = useSidebar()
  return (
    <Link
      href={link.href}
      className={cn(
        'group/sidebar flex items-center justify-start  gap-2 py-2',
        className,
      )}
      {...props}>
      {link.icon}

      <motion.span
        animate={{
          display: animate ? (open ? 'inline-block' : 'none') : 'inline-block',
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className='text-neutral-700 dark:text-neutral-200 !m-0 inline-block whitespace-pre !p-0 text-sm transition duration-150 group-hover/sidebar:translate-x-1'>
        {link.label}
      </motion.span>
    </Link>
  )
}

export const SidebarButton = ({
  button,
  className,
  ...props
}: {
  button: any
  className?: string
  props?: LinkProps
}) => {
  const { open, animate } = useSidebar()
  return (
    <button
      onClick={button.function}
      className={cn(
        'group/sidebar flex items-center justify-start  gap-2 py-2',
        className,
      )}
      {...props}>
      {button.icon}

      <motion.span
        animate={{
          display: animate ? (open ? 'inline-block' : 'none') : 'inline-block',
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className='text-neutral-700 dark:text-neutral-200 !m-0 inline-block whitespace-pre !p-0 text-sm transition duration-150 group-hover/sidebar:translate-x-1'>
        {button.label}
      </motion.span>
    </button>
  )
}

export function SidebarView({ user }: { user: User }) {
  const router = useRouter()
  const handleSignOut = () => {
    signOut()
    router.push('/')
  }
  const links = [
    {
      label: 'Personal Information',
      href: '/profile',
      icon: (
        <FaUser className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
      ),
    },
  ]

  const buttons = [
    {
      label: 'Logout',
      function: () => handleSignOut(),
      icon: (
        <IoMdArrowBack className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
      ),
    },
  ]
  const [open, setOpen] = useState(false)

  return (
    <div
      className={cn(
        'border-neutral-200  sticky top-0 overflow-hidden rounded-rounded-btn',
        'z-50 max-h-screen', // for your use case, use `h-screen` instead of `h-[60vh]`
      )}>
      <Sidebar open={open} setOpen={setOpen} animate={true}>
        <SidebarBody className='justify-between gap-10'>
          <div className='flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
            {open ? <Logo /> : <LogoIcon />}
            <div className='mt-8 flex flex-col gap-2'>
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
              {buttons.map((button, idx) => (
                <SidebarButton key={idx} button={button} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: user.username || '',
                href: '#',
                icon: (
                  <Image
                    src={user?.imageUrl || ''}
                    className='h-7 w-7 flex-shrink-0 rounded-full'
                    width={50}
                    height={50}
                    alt='Avatar'
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  )
}
export const Logo = () => {
  return (
    <Link
      href='/'
      className='relative z-20 flex items-center space-x-2 py-1  text-xl font-bold text-base-content'>
      <Image
        src='/favicon.ico'
        className='h-7 w-7 flex-shrink-0 rounded-full'
        width={60}
        height={60}
        alt='Avatar'
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className=''>
        ContentQL
      </motion.span>
    </Link>
  )
}
export const LogoIcon = () => {
  return (
    <Link
      href='#'
      className='relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black'>
      <Image
        src='/favicon.ico'
        className='h-7 w-7 flex-shrink-0 rounded-full'
        width={60}
        height={60}
        alt='Avatar'
      />
    </Link>
  )
}
