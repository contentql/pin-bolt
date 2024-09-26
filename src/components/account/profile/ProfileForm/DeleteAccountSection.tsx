'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { trpc } from '@/trpc/client'

export default function DeleteAccountSection() {
  const [open, setOpen] = useState(false)

  const [isAllowedToDelete, setIsAllowedToDelete] = useState(false)
  const [confirmation, setConfirmation] = useState('')
  const router = useRouter()

  const {
    mutate: deleteUserMutation,
    isPending: isDeleteAccountPending,
    isError: isDeleteAccountError,
    error: DeleteAccountError,
    isSuccess: DeleteAccountSuccess,
  } = trpc.user.deleteUser.useMutation({
    onSuccess: () => {
      toast.success('Account deleted successfully')
      router.push('/sign-up')
    },
    onError: () => {
      toast.error('Unable to delete the account, try again!')
    },
  })

  const handleDeleteUser = async (e: any) => {
    e.preventDefault()

    deleteUserMutation()
  }

  useEffect(() => {
    if (isDeleteAccountPending === false && open === true) {
      setOpen(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleteAccountPending])

  return (
    <div className='flex flex-col rounded-rounded-box bg-error/20 p-8 text-base-content shadow-md'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-16 w-16 rounded-2xl  bg-error p-3'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
          </svg>
          <div className='ml-3 flex flex-col'>
            <div className='font-medium leading-none'>
              Delete Your Account ?
            </div>
            <p className='mt-1 text-sm leading-none text-base-content/70'>
              By deleting your account you will lose your all data
            </p>
          </div>
        </div>
        <button
          className='flex-no-shrink shadow-s ml-4 rounded-full bg-error  px-5 py-2 text-sm font-medium tracking-wider text-base-content hover:shadow-lg'
          onClick={() => setOpen(true)}>
          Delete
        </button>
      </div>

      {/* Delete Account Dialog */}
      {open && (
        <div
          className='relative z-[100]'
          aria-labelledby='modal-title'
          role='dialog'
          aria-modal={false}>
          <div className='fixed inset-0 bg-base-content/70 bg-opacity-75 transition-opacity'></div>

          <div className='fixed inset-0 z-[100] w-screen overflow-y-auto'>
            <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
              <div className='relative transform overflow-hidden rounded-rounded-box bg-base-300 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                <div className='bg-base-300 px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                  <div className='sm:flex sm:items-start'>
                    <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-error/10 sm:mx-0 sm:h-10 sm:w-10'>
                      <svg
                        className='h-6 w-6 text-error'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        aria-hidden='true'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z'
                        />
                      </svg>
                    </div>
                    <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                      <h3
                        className='text-base font-semibold leading-6 text-base-content'
                        id='modal-title'>
                        Delete account
                      </h3>
                      <div className='mt-2'>
                        <p className='text-sm text-base-content/70'>
                          Permanently remove your Personal Account and all of
                          its contents from the platform. This action is not
                          reversible, so please continue with caution.
                        </p>
                      </div>
                      <div className='pt-2'>
                        <label
                          htmlFor='confirmDelete'
                          className='block p-2 text-sm font-medium'>
                          Type{' '}
                          <span className='rounded-md border bg-base-200 p-0.5  italic '>
                            delete
                          </span>{' '}
                          to confirm.
                        </label>
                        <input
                          type='text'
                          id='confirmDelete'
                          name='confirmDelete'
                          placeholder='We are sad to see you go!'
                          value={confirmation}
                          onChange={e => {
                            setConfirmation(e.target.value)
                            if (e.target.value === 'delete') {
                              setIsAllowedToDelete(true)
                            } else {
                              setIsAllowedToDelete(false)
                            }
                          }}
                          className='mt-1 w-full rounded-rounded-btn bg-base-200 p-2 '
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='bg-base-300 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                  <form onSubmit={handleDeleteUser}>
                    <button
                      type='submit'
                      disabled={!isAllowedToDelete}
                      className='inline-flex w-full justify-center rounded-md bg-error px-3 py-2 text-sm font-semibold text-base-content shadow-sm  disabled:cursor-not-allowed disabled:bg-opacity-50 sm:ml-3 sm:w-auto'>
                      {isDeleteAccountPending
                        ? 'Deleting...'
                        : 'Delete Account'}
                    </button>
                  </form>
                  <button
                    type='button'
                    onClick={() => setOpen(false)}
                    className='mt-3 inline-flex w-full justify-center rounded-md bg-base-content px-3 py-2 text-sm font-semibold text-base-100 shadow-sm ring-1 ring-inset sm:mt-0 sm:w-auto'>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
