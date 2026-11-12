import { loadArticles, type ArticleExtra, type EditorialArticle } from "@/content/articles";
import editorialJson from "@/research/stories.json";
import richJson from "@/research/stories.data.json";

/** 読みもの。本文は research/stories.json。出典と関連スラッグは stories.data.json。 */
export const stories = loadArticles(editorialJson as EditorialArticle[], richJson as ArticleExtra[]);
