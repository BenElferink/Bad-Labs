import { useRouter } from 'next/navigation'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid'

const BackButton = () => {
  const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      className='w-6 h-6 p-0.5 rounded-full bg-zinc-400 hover:bg-zinc-300 text-zinc-800 flex items-center justify-center absolute top-4 left-4'
    >
      <ArrowUturnLeftIcon />
    </button>
  )
}

export default BackButton
