import {
  Entrepot,
  EntrepotStorageRacks,
  entrepotAPI,
  racksAPI,
} from '@/api/entrepot';
import { ShowFormType } from '@/constants';
import { showMessageStatus } from '@/utils';
import useForm from '@arco-design/web-react/es/Form/useForm';
import { useRequest } from 'ahooks';
import { useState } from 'react';

const useInfo = () => {
  const [showTypeEntrepot, setShowTypeEntrepot] = useState<ShowFormType>();
  const [showTypeRacks, setShowTypeRacks] = useState<ShowFormType>(
    ShowFormType.edit
  );
  const [formEntrepotRef] = useForm();
  const [formRacksRef] = useForm();
  const [activeEntrepot, setActiveEntrepot] = useState<Entrepot>(null);
  const [activeRacks, setActiveRacks] = useState<EntrepotStorageRacks>(null);
  const {
    data: racksList,
    loading: rackLoading,
    run: getRacksList,
  } = useRequest(
    async (params: Parameters<typeof racksAPI.getList>[0]) => {
      const res = await racksAPI.getList({
        pageNum: 1,
        pageSize: 100,
        ...params,
      });
      return res.data.data.list;
    },
    {
      manual: true,
    }
  );

  const {
    run: getEntrepotList,
    data: entrepotList,
    loading: entrepotLoading,
  } = useRequest(async () => {
    const res = await entrepotAPI.getList({
      pageNum: 1,
      pageSize: 100,
      entrepotType: 1,
    });
    const { list } = res.data.data;
    if (list.length) {
      setActiveEntrepot(list[0]);
      getRacksList({
        entrepotId: list[0].id,
      });
    }
    return list;
  });
  const { run: createEntrepotHandler, loading: createEntrepotLoading } =
    useRequest(
      async (formData) => {
        const res = await entrepotAPI.insert({
          ...formData,
          // storeType: formData.storeType[0],
        });
        await showMessageStatus(res.data);
        formEntrepotRef.resetFields();
        setShowTypeEntrepot(null);
        getEntrepotList();
      },
      {
        manual: true,
      }
    );

  const { run: createRacksHandler, loading: createRacksLoading } = useRequest(
    async (formData) => {
      const res = await racksAPI.insert({
        entrepotId: activeEntrepot.id,
        ...formData,
      });
      await showMessageStatus(res.data);
      formRacksRef.resetFields();
      await getRacksList({
        entrepotId: activeEntrepot.id,
      });
    },
    {
      manual: true,
    }
  );
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
  };
};

export default useInfo;
