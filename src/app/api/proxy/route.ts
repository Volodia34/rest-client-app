import { NextRequest, NextResponse } from 'next/server';

export async function middlewareHandler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return NextResponse.json(
      { error: 'Missing "url" query parameter' },
      { status: 400 }
    );
  }

  try {
    const decodedUrl = decodeURIComponent(targetUrl);
    const method = req.method.toUpperCase();

    const headers: Record<string, string> = {};
    req.headers.forEach((value, key) => {
      if (
        !['connection', 'content-length', 'accept-encoding'].includes(
          key.toLowerCase()
        )
      ) {
        headers[key] = value;
      }
    });

    let body: BodyInit | undefined;

    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
      const raw = await req.text();

      try {
        JSON.parse(raw);
        body = raw;
      } catch {
        console.warn('⚠️ Body is not valid JSON. Using raw text instead.');
        body = raw;
      }
    }

    const response = await fetch(decodedUrl, {
      method,
      headers,
      body: method === 'GET' ? undefined : body,
    });

    const contentType = response.headers.get('content-type') || '';
    const responseBody = contentType.includes('application/json')
      ? await response.json()
      : await response.text();

    return contentType.includes('application/json')
      ? NextResponse.json(responseBody, { status: response.status })
      : new NextResponse(responseBody, {
          status: response.status,
          headers: { 'Content-Type': contentType },
        });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`❌ Proxy ${req.method} failed:`, error);
      return NextResponse.json(
        { error: error.message || 'Proxy request failed' },
        { status: 500 }
      );
    }

    console.error(`❌ Proxy ${req.method} failed with an unknown error.`);
    return NextResponse.json(
      { error: 'An unknown error occurred' },
      { status: 500 }
    );
  }
}

export const GET = middlewareHandler;
export const POST = middlewareHandler;
export const PUT = middlewareHandler;
export const PATCH = middlewareHandler;
export const DELETE = middlewareHandler;
