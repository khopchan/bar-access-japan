import { loadArticles, type ArticleExtra, type EditorialArticle } from "@/content/articles";
import editorialJson from "@/research/guides.json";
import richJson from "@/research/guides.data.json";

/** 案内。本文は research/guides.json。出典と関連スラッグは guides.data.json。 */
export const guides = loadArticles(editorialJson as EditorialArticle[], richJson as ArticleExtra[]);
