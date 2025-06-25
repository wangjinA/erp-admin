import useForm from '@arco-design/web-react/es/Form/useForm'

import { useRequest } from 'ahooks'

import { useEffect, useState } from 'react'

import {
  Entrepot,
  EntrepotStorageRacks,
  entrepotAPI,
  racksAPI,
} from '@/api/admin/entrepot'
import { ShowFormType } from '@/constants'
import { showMessage } from '@/utils'

export function useEntrepotInfo(params: {
  isPureList?: boolean
}) {
  const { isPureList } = params
  const [showTypeEntrepot, setShowTypeEntrepot] = useState<ShowFormType>()
  const [showTypeRacks, setShowTypeRacks] = useState<ShowFormType>(
    ShowFormType.edit,
  )
  const [formEntrepotRef] = useForm()
  const [formRacksRef] = useForm()
  const [activeEntrepot, setActiveEntrepot] = useState<Entrepot>(null)
  const [updateEntrepotData, setUpdateEntrepotData] = useState<Entrepot>(null)
  const [activeRacks, setActiveRacks] = useState<EntrepotStorageRacks>(null)
  const {
    data: racksList,
    loading: rackLoading,
    run: getRacksList,
  } = useRequest(
    async (params: Parameters<typeof racksAPI.getList>[0]) => {
      if (isPureList) {
        return []
      }
      formRacksRef.resetFields()
      setActiveRacks(null)
      const sendData = {
        pageNum: 1,
        pageSize: 100,
        entrepotId: activeEntrepot?.id,
        ...params,
      }

      if (!sendData.entrepotId) {
        return []
      }
      const res = await racksAPI.getList(sendData)
      const { list } = res.data.data
      if (list.length) {
        const target
          = list.find(racks => racks.id === activeRacks?.id) || list[0]
        setActiveRacks(target)
        formRacksRef.setFieldsValue(target)
      }
      return list
    },
    {
      manual: false,
      refreshDeps: [activeEntrepot],
      debounceWait: 300,
    },
  )

  const {
    run: getEntrepotList,
    data: entrepotList,
    loading: entrepotLoading,
  } = useRequest(async () => {
    const res = await entrepotAPI.getList({
      pageNum: 1,
      pageSize: 100,
      entrepotType: 1,
    })
    const { list } = res.data.data.data
    if (list.length) {
      const target
        = list.find(entrepot => entrepot.id === activeEntrepot?.id) || list[0]
      setActiveEntrepot(target)
    }
    return list
  })

  const { run: createEntrepotHandler, loading: createEntrepotLoading }
    = useRequest(
      async (formData) => {
        debugger;
        await showMessage(() => entrepotAPI.insert(formData))
        setShowTypeEntrepot(null)
        getEntrepotList()
      },
      {
        manual: true,
      },
    )

  const { run: updateEntrepotHandler, loading: updateEntrepotLoading } = useRequest(
    async (params) => {
      await showMessage(() => entrepotAPI.update(params))
      setShowTypeEntrepot(null)
      getEntrepotList()
    },
    {
      manual: true,
    },
  )

  const { run: createRacksHandler, loading: createRacksLoading } = useRequest(
    async (formData) => {
      await showMessage(() => racksAPI.insert({
        entrepotId: activeEntrepot.id,
        ...formData,
      }))
      formRacksRef.resetFields()
      await getRacksList({
        entrepotId: activeEntrepot.id,
      })
    },
    {
      manual: true,
    },
  )

  const { run: removeRacksHandler, loading: removeRacksLoading } = useRequest(
    async (racksId) => {
      await showMessage(() => racksAPI.remove(racksId))
      setActiveRacks(null)
      // setShowTypeRacks(null);
      await getRacksList({
        entrepotId: activeEntrepot.id,
      })
    },
    {
      manual: true,
    },
  )

  const { run: removeEntrepotHandler, loading: removeEntrepotLoading } = useRequest(
    async (racksId) => {
      await showMessage(() => entrepotAPI.remove(racksId))
      setActiveEntrepot(null)
      getEntrepotList()
    },
    {
      manual: true,
    },
  )

  const { run: updateRacksHandler, loading: updateRacksLoading } = useRequest(
    async (params) => {
      await showMessage(() => racksAPI.update(params))
      setActiveRacks(null)
      getRacksList({
        entrepotId: activeEntrepot.id,
      })
    },
    {
      manual: true,
    },
  )

  useEffect(() => {
    if (activeRacks) {
      setShowTypeRacks(ShowFormType.edit)
    }
    else {
      setShowTypeRacks(ShowFormType.create)
    }
  }, [activeRacks])

  useEffect(() => {
    if (!showTypeEntrepot) {
      setUpdateEntrepotData(null)
      formEntrepotRef.clearFields()
    }
  }, [showTypeEntrepot, formEntrepotRef])

  return {
    showTypeEntrepot,
    setShowTypeEntrepot,
    formEntrepotRef,
    formRacksRef,
    activeEntrepot,
    setActiveEntrepot,
    racksList,
    rackLoading,
    getRacksList,
    createEntrepotHandler,
    createEntrepotLoading,
    getEntrepotList,
    entrepotList,
    entrepotLoading,
    showTypeRacks,
    setShowTypeRacks,
    activeRacks,
    setActiveRacks,
    createRacksLoading,
    createRacksHandler,
    removeRacksHandler,
    removeRacksLoading,
    updateRacksHandler,
    updateRacksLoading,
    updateEntrepotHandler,
    updateEntrepotLoading,
    removeEntrepotHandler,
    removeEntrepotLoading,
    updateEntrepotData,
    setUpdateEntrepotData,
  }
}
