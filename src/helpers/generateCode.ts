import { HeaderRest } from '@/types/restClient';

export const generateCode = (
  language: string,
  method: string,
  fullUrl: string,
  headers: HeaderRest[],
  body: string | null
): string => {
  const headerString = headers.map((el) => {
    return `${el.key}: ${el.value}`;
  });

  if (!language) return '// You need the language code. ';
  if (!fullUrl) return '// You need the main URL. ';
  if (!method) return '// You need the method. ';
  if (!headers[0].key) return '// You need the headers. ';
  if (!body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
    return '// You need the body. ';
  }

  switch (language) {
    case 'curl':
      return `curl -X ${method} "${fullUrl}"${
        body ? ` -d '${body}'` : ''
      } -H "${headerString}"`;

    case 'JavaScript (Fetch api)':
      return `
        fetch("${fullUrl}", {
          method: "${method}",
          headers: { ${headerString} },
          ${body ? `body: '${body}'` : ''}
        }).then(res => res.json()).then(console.log);`;

    case 'JavaScript (XHR)':
      return `
        const xhr = new XMLHttpRequest();
        xhr.open("${method}", "${fullUrl}");
        ${headers
          .map((el) => `xhr.setRequestHeader("${el.key}", "${el.value}");`)
          .join('\n')}
        xhr.onload = () => console.log(xhr.responseText);
        xhr.send(${body ? `'${body}'` : 'null'});`;

    case 'NodeJS':
      return `
        const https = require('https');
        
        const options = {
          method: '${method}',
          headers: { ${headerString} }
        };
  
        const req = https.request("${fullUrl}", options, res => {
          res.on('data', d => process.stdout.write(d));
        });
  
        req.on('error', console.error);
        ${body ? `req.write('${body}');` : ''}
        req.end();`;

    case 'Python':
      return `
        import requests
        
        url = "${fullUrl}"
        headers = { ${headerString} }
        ${body ? `data = '${body}'\n` : ''}
        
        response = requests.${method.toLowerCase()}(url, ${
          body ? 'data=data, ' : ''
        }headers=headers)
        print(response.text)`;

    case 'Java':
      return `
        HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create("${fullUrl}"))
        .method("${method}", ${
          body
            ? `HttpRequest.BodyPublishers.ofString("${body}")`
            : 'HttpRequest.BodyPublishers.noBody()'
        })
        .header(${headers.map((el) => `${el.key}, ${el.value}`)})
        .build();`;

    case 'C#':
      return `
        var client = new HttpClient();
        var request = new HttpRequestMessage(HttpMethod.${method}, "${fullUrl}");
        ${body ? `request.Content = new StringContent("${body}");` : ''}
        ${headers
          .map((el) => `request.Headers.Add("${el.key}", "${el.value}");`)
          .join('\n')}
        var response = await client.SendAsync(request);
        var result = await response.Content.ReadAsStringAsync();`;

    case 'Go':
      return `
        client := &http.Client{}
        req, _ := http.NewRequest("${method}", "${fullUrl}", ${
          body ? `strings.NewReader("${body}")` : 'nil'
        })
        ${headers
          .map((el) => `req.Header.Add("${el.key}", "${el.value}")`)
          .join('\n')}
        resp, _ := client.Do(req)
        defer resp.Body.Close()`;

    default:
      return '// Unsupported language';
  }
};
