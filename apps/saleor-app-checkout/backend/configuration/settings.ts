import {
  ChannelDocument,
  ChannelQuery,
  ChannelQueryVariables,
  ChannelsDocument,
  ChannelsQuery,
  ChannelsQueryVariables,
  PrivateMetafieldsInferedDocument,
  PrivateMetafieldsInferedQuery,
  PrivateMetafieldsInferedQueryVariables,
  PublicMetafieldsInferedDocument,
  PublicMetafieldsInferedQuery,
  PublicMetafieldsInferedQueryVariables,
  UpdatePrivateMetadataDocument,
  UpdatePrivateMetadataMutation,
  UpdatePrivateMetadataMutationVariables,
  UpdatePublicMetadataDocument,
  UpdatePublicMetadataMutation,
  UpdatePublicMetadataMutationVariables,
} from "@/saleor-app-checkout/graphql";
import { getClientForAuthData } from "@/saleor-app-checkout/backend/saleorGraphqlClient";
import { defaultActiveChannelPaymentProviders } from "@/saleor-app-checkout/config/defaults";
import { mergeChannelsWithPaymentProvidersSettings } from "./utils";
import { PrivateSettingsValues, PublicSettingsValues } from "@/saleor-app-checkout/types/api";
import { mapPrivateSettingsToMetadata } from "./mapPrivateSettingsToMetadata";
import { mapPrivateMetafieldsToSettings } from "./mapPrivateMetafieldsToSettings";
import { mapPublicMetafieldsToSettings } from "@/saleor-app-checkout/frontend/misc/mapPublicMetafieldsToSettings";
import { allPrivateSettingID, allPublicSettingID } from "@/saleor-app-checkout/types/common";
import { getAppId } from "../environment";
import * as Apl from "@/saleor-app-checkout/config/apl";
import { mapPublicSettingsToMetadata } from "@/saleor-app-checkout/frontend/misc/mapPublicSettingsToMetadata";

export const getPrivateSettings = async ({
  saleorApiUrl,
  obfuscateEncryptedData,
}: {
  saleorApiUrl: string;
  obfuscateEncryptedData: boolean;
}) => {
  const authData = await Apl.get(saleorApiUrl);
  const client = getClientForAuthData(authData);

  const { data, error } = await client
    .query<PrivateMetafieldsInferedQuery, PrivateMetafieldsInferedQueryVariables>(
      PrivateMetafieldsInferedDocument,
      {
        keys: [...allPrivateSettingID],
      }
    )
    .toPromise();

  if (error) {
    throw error;
  }

  const settingsValues = mapPrivateMetafieldsToSettings(
    data?.app?.privateMetafields || {},
    obfuscateEncryptedData
  );

  return settingsValues;
};

export const getPublicSettings = async ({ saleorApiUrl }: { saleorApiUrl: string }) => {
  const authData = await Apl.get(saleorApiUrl);

  const { data, error } = await getClientForAuthData(authData)
    .query<PublicMetafieldsInferedQuery, PublicMetafieldsInferedQueryVariables>(
      PublicMetafieldsInferedDocument,
      { keys: [...allPublicSettingID] }
    )
    .toPromise();

  console.log(data, error); // for deployment debug pusposes

  if (error) {
    throw error;
  }

  console.log(data?.app?.metafields); // for deployment debug pusposes

  const settingsValues = mapPublicMetafieldsToSettings(data?.app?.metafields || {});

  return settingsValues;
};

export const getActivePaymentProvidersSettings = async (saleorApiUrl: string) => {
  const authData = await Apl.get(saleorApiUrl);
  const settings = await getPublicSettings({ saleorApiUrl });

  console.log({ saleorApiUrl });

  const { data, error } = await getClientForAuthData(authData)
    .query<ChannelsQuery, ChannelsQueryVariables>(ChannelsDocument, {})
    .toPromise();

  console.log(data, error); // for deployment debug purposes

  if (error) {
    throw error;
  }

  const activePaymentProvidersSettings = mergeChannelsWithPaymentProvidersSettings(
    settings,
    data?.channels
  );

  return activePaymentProvidersSettings;
};

export const getChannelActivePaymentProvidersSettings = async ({
  saleorApiUrl,
  channelId,
}: {
  saleorApiUrl: string;
  channelId: string;
}) => {
  const authData = await Apl.get(saleorApiUrl);
  const settings = await getPublicSettings({ saleorApiUrl });

  const { data, error } = await getClientForAuthData(authData)
    .query<ChannelQuery, ChannelQueryVariables>(ChannelDocument, {
      id: channelId,
    })
    .toPromise();

  console.log(data, error); // for deployment debug pusposes

  if (error) {
    throw error;
  }

  const channelActivePaymentProvidersSettings =
    settings.channelActivePaymentProviders?.[channelId] || defaultActiveChannelPaymentProviders;

  return channelActivePaymentProvidersSettings;
};
export const setPublicSettings = async (saleorApiUrl: string, settings: PublicSettingsValues) => {
  const authData = await Apl.get(saleorApiUrl);
  const client = getClientForAuthData(authData);

  const metadata = mapPublicSettingsToMetadata(settings);

  const appId = await getAppId(saleorApiUrl);

  const { data, error } = await client
    .mutation<UpdatePublicMetadataMutation, UpdatePublicMetadataMutationVariables>(
      UpdatePublicMetadataDocument,
      {
        id: appId,
        input: metadata,
        keys: [...allPrivateSettingID],
      }
    )
    .toPromise();

  if (error) {
    throw error;
  }
  return data;
};
export const setPrivateSettings = async (
  saleorApiUrl: string,
  settings: PrivateSettingsValues<"unencrypted">
) => {
  const authData = await Apl.get(saleorApiUrl);
  const client = getClientForAuthData(authData);

  const metadata = mapPrivateSettingsToMetadata(settings);

  const appId = await getAppId(saleorApiUrl);

  const { data, error } = await client
    .mutation<UpdatePrivateMetadataMutation, UpdatePrivateMetadataMutationVariables>(
      UpdatePrivateMetadataDocument,
      {
        id: appId,
        input: metadata,
        keys: [...allPrivateSettingID],
      }
    )
    .toPromise();

  console.log(data, error); // for deployment debug pusposes

  if (error) {
    throw error;
  }

  console.log(data?.updatePrivateMetadata?.item?.privateMetafields); // for deployment debug pusposes

  const settingsValues = mapPrivateMetafieldsToSettings(
    data?.updatePrivateMetadata?.item?.privateMetafields || {},
    true
  );

  return settingsValues;
};
