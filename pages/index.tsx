import Header from "@/components/react/Header";
import {Inter} from "next/font/google";
import Head from "next/head";
import {useBlogListQuery} from "@/generated";
import Nav from "@/components/react/Nav";
import BlogPostSummary from "@/components/cms/blocks/BlogPostSummary";
import BlogPostSummaryLead from "@/components/cms/blocks/BlogPostSummaryLead";
import chance from 'chance';

const inter = Inter({subsets: ["latin"]});
export default function Home() {
    const data = useBlogListQuery().data;
    const items = data?.LocationItemPage?.items;
    let firstItem = items == null ? null : items[0];
    return (
        <>
            <Head>
                <title>The City Guide</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Header height={60}/>
            <div className="container px-4 md:px-0 max-w-6xl mx-auto -mt-32">
                <div className="mx-0 sm:mx-6">
                    {/*<Nav/>*/}
                    {data?.LocationItemPage?.items &&
                        data.LocationItemPage?.items
                            .filter((item,index) => index == 0)
                            .map((content) => {
                        return (
                            <BlogPostSummaryLead key={content?.RelativePath} blogItem={content} />
                        );
                    })}
                    <div className="flex flex-wrap justify-between pt-12 -mx-6">
                        {data?.LocationItemPage?.items &&
                            data.LocationItemPage?.items
                                .filter((item,index) => index != 0)
                                .map((content) => {
                            // @ts-ignore
                                    return (
                                        // <BlogPostSummary key={content?.RelativePath} blogItem={content} width={`${chance().pickone(['1/3','2/3','2/3','1/3'])}`} />
                                    <BlogPostSummary key={content?.RelativePath} blogItem={content} />
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
