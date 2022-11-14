import { APIError } from './APIError';

type ClientOptions = {
  endpoint: string;
  method?: 'POST' | 'GET' | 'PUT' | 'DELETE';
  token?: string;
  body?: string;
};

export async function payloadClient<Data>({
  endpoint,
  method = 'GET',
  token,
  body
}: ClientOptions): Promise<Data> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/${endpoint}`,
    {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `JWT ${token}` : ''
      }
    }
  );

  const resBody = await response.json();

  if (!response.ok) {
    throw new APIError(response.statusText, response.status, resBody);
  }

  return resBody;
}
