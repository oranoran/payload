import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useConfig, useAuth } from '@payloadcms/config-provider';
import { useStepNav } from '../../elements/StepNav';

import usePayloadAPI from '../../../hooks/usePayloadAPI';
import { useLocale } from '../../utilities/Locale';
import { DocumentInfoProvider } from '../../utilities/DocumentInfo';
import DefaultAccount from './Default';
import buildStateFromSchema from '../../forms/Form/buildStateFromSchema';
import RenderCustomComponent from '../../utilities/RenderCustomComponent';
import { NegativeFieldGutterProvider } from '../../forms/FieldTypeGutter/context';

const AccountView: React.FC = () => {
  const { state: locationState } = useLocation<{ data: unknown }>();
  const locale = useLocale();
  const { setStepNav } = useStepNav();
  const { user, permissions } = useAuth();
  const [initialState, setInitialState] = useState({});
  const {
    serverURL,
    routes: { api },
    collections,
    admin: {
      user: adminUser,
      components: {
        views: {
          Account: CustomAccount,
        } = {
          Account: undefined,
        },
      } = {},
    } = {
      user: 'users',
    },
  } = useConfig();

  const collection = collections.find((coll) => coll.slug === user.collection);

  const { fields } = collection;

  const collectionPermissions = permissions?.collections?.[adminUser];

  const [{ data, isLoading }] = usePayloadAPI(
    `${serverURL}${api}/${collection?.slug}/${user?.id}?depth=0`,
    { initialParams: { 'fallback-locale': 'null' } },
  );

  const hasSavePermission = collectionPermissions?.update?.permission;
  const dataToRender = locationState?.data || data;
  const apiURL = `${serverURL}${api}/${user.collection}/${data?.id}`;

  const action = `${serverURL}${api}/${user.collection}/${data?.id}?locale=${locale}&depth=0`;

  useEffect(() => {
    const nav = [{
      label: 'Account',
    }];

    setStepNav(nav);
  }, [setStepNav]);

  useEffect(() => {
    const awaitInitialState = async () => {
      const state = await buildStateFromSchema(fields, dataToRender);
      setInitialState(state);
    };

    awaitInitialState();
  }, [dataToRender, fields]);

  return (
    <DocumentInfoProvider
      type="collection"
      slug={collection?.slug}
      id={user?.id}
    >
      <NegativeFieldGutterProvider allow>
        <RenderCustomComponent
          DefaultComponent={DefaultAccount}
          CustomComponent={CustomAccount}
          componentProps={{
            action,
            data,
            collection,
            permissions: collectionPermissions,
            hasSavePermission,
            initialState,
            apiURL,
            isLoading,
          }}
        />
      </NegativeFieldGutterProvider>
    </DocumentInfoProvider>
  );
};

export default AccountView;
