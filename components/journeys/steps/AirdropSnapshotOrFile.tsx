import { useEffect, useState } from 'react'
import JourneyStepWrapper from './JourneyStepWrapper'
import type { AirdropSettings } from '@/@types'

const AirdropSnapshotOrFile = (props: {
  defaultData: Partial<AirdropSettings>
  callback: (payload: Partial<AirdropSettings>) => void
  next?: () => void
  back?: () => void
}) => {
  const { defaultData, callback, next, back } = props
  const [data, setData] = useState(defaultData)

  useEffect(() => {
    if (Object.keys(data).length) callback(data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <JourneyStepWrapper disableNext={false} next={next} back={back}>
      <h6 className='mb-6 text-xl text-center'>How should holders get their airdrop?</h6>

      <div
        onClick={() => setData(() => ({ useCustomList: false }))}
        className={
          'group cursor-pointer my-4 p-4 border rounded-lg ' +
          (data['useCustomList'] === false ? 'text-white' : 'text-zinc-400 border-transparent')
        }
      >
        <label className='flex items-center group-hover:text-white cursor-pointer'>
          <input type='radio' name='useCustomList' onChange={() => {}} checked={data['useCustomList'] === false} />
          <span className='ml-2 text-lg'>Snapshot</span>
        </label>
        <p className='mt-1 text-sm group-hover:text-white'>
          You&apos;ll be asked to provide Policy IDs and some other relevant information.
        </p>
      </div>

      <div
        onClick={() => setData(() => ({ useCustomList: true }))}
        className={
          'group cursor-pointer my-4 p-4 border rounded-lg ' +
          (data['useCustomList'] === true ? 'text-white' : 'text-zinc-400 border-transparent')
        }
      >
        <label className='flex items-center group-hover:text-white cursor-pointer'>
          <input type='radio' name='useCustomList' onChange={() => {}} checked={data['useCustomList'] === true} />
          <span className='ml-2 text-lg'>Custom List</span>
        </label>
        <p className='mt-1 text-sm group-hover:text-white'>
          You already have a list of receiving wallets and the amounts for each wallet, skip the snapshot.
        </p>
      </div>
    </JourneyStepWrapper>
  )
}

export default AirdropSnapshotOrFile
