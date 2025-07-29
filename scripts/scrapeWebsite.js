import axios from 'axios';
import * as cheerio from 'cheerio';
import { storeWebsiteData } from '../src/utils/websiteData.ts';

const BASE_URL = 'https://pkm.punjab.gov.pk/public';

async function scrapeWebsite() {
  try {
    const response = await axios.get(BASE_URL);
    const $ = cheerio.load(response.data);
    
    const websiteData = [];

    // Extract main content
    $('main, article, .content').each((_, element) => {
      const content = $(element).text().trim();
      const title = $('h1, h2').first().text().trim();
      
      websiteData.push({
        url: BASE_URL,
        content,
        title
      });
    });

    // Store the scraped data
    await storeWebsiteData(websiteData);
    console.log('Website data scraped and stored successfully');
  } catch (error) {
    console.error('Error scraping website:', error);
  }
}

scrapeWebsite();