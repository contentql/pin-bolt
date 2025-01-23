const Error = ({ label, error }: { label: string; error: any }) => {
  return (
    <div className='text-md text-red-500'>
      {error?.message || `${label} is ${error?.type}`}
    </div>
  )
}

export default Error
