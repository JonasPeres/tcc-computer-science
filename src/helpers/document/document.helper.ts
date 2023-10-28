/* eslint-disable @typescript-eslint/no-explicit-any */
export class DocumentHelper {

  setDocumentTitle(title: string){
    document.title = title
  }

  setDocumentFavicon(favicon: any){
    let link: any = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = favicon;
  }
}