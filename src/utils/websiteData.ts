import { Document } from 'langchain/document';
import { ChromaClient } from 'chromadb';

export interface WebsiteData {
  url: string;
  content: string;
  title: string;
}

const chroma = new ChromaClient();
const collectionName = 'punjab_police_data';

export async function storeWebsiteData(data: WebsiteData[]) {
  const collection = await chroma.createCollection({ name: collectionName });
  
  const documents = data.map(item => new Document({
    pageContent: item.content,
    metadata: { url: item.url, title: item.title }
  }));

  await collection.add({
    ids: documents.map((_, i) => `doc_${i}`),
    documents: documents.map(doc => doc.pageContent),
    metadatas: documents.map(doc => doc.metadata)
  });
}

export async function queryWebsiteData(query: string) {
  const collection = await chroma.getCollection({ name: collectionName });
  const results = await collection.query({
    queryTexts: [query],
    nResults: 3
  });
  
  return results.documents[0];
}