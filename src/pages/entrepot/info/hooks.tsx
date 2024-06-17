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
import { useEffect, useState } from 'react';

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
      formRacksRef.resetFields();
      setActiveRacks(null);
      const sendData = {
        pageNum: 1,
        pageSize: 100,
        entrepotId: activeEntrepot?.id,
        ...params,
      };

      if (!sendData.entrepotId) {
        return [];
      }
      const res = await racksAPI.getList(sendData);
      const { list } = res.data.data;
      if (list.length) {
        const target =
          list.find((racks) => racks.id === activeRacks?.id) || list[0];
        setActiveRacks(target);
        formRacksRef.setFieldsValue(target);
      } else {
      }
      return list;
    },
    {
      manual: false,
      refreshDeps: [activeEntrepot],
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
      const target =
        list.find((entrepot) => entrepot.id === activeEntrepot?.id) || list[0];
      setActiveEntrepot(target);
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

  const { run: removeRacks, loading: removeRacksLoading } = useRequest(
    async (racksId) => {
      const res = await racksAPI.remove(racksId);
      await showMessageStatus(res.data);
      setActiveRacks(null);
      // setShowTypeRacks(null);
      await getRacksList({
        entrepotId: activeEntrepot.id,
      });
    },
    {
      manual: true,
    }
  );

  const { run: removeEntrepot, loading: removeEntrepotLoading } = useRequest(
    async (racksId) => {
      const res = await entrepotAPI.remove(racksId);
      await showMessageStatus(res.data);
      setActiveEntrepot(null);
      await getEntrepotList();
    },
    {
      manual: true,
    }
  );

  const { run: updateRacks, loading: updateRacksLoading } = useRequest(
    async (params) => {
      const res = await racksAPI.update(params);
      await showMessageStatus(res.data);
      await getRacksList({
        entrepotId: activeEntrepot.id,
      });
    },
    {
      manual: true,
    }
  );

  const { run: updateEntrepot, loading: updateEntrepotLoading } = useRequest(
    async (params) => {
      const res = await entrepotAPI.update({
        ...params,
        storeType: params.storeType[0],
      });
      await showMessageStatus(res.data);
      await getEntrepotList();
    },
    {
      manual: true,
    }
  );

  useEffect(() => {
    if (activeRacks) {
      setShowTypeRacks(ShowFormType.edit);
    } else {
      setShowTypeRacks(ShowFormType.create);
    }
  }, [activeRacks]);

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
    removeRacks,
    removeRacksLoading,
    updateRacks,
    updateRacksLoading,
    updateEntrepot,
    updateEntrepotLoading,
    removeEntrepot,
    removeEntrepotLoading,
  };
};

export default useInfo;
