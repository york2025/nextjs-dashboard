// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-gray-900 px-4">
            <div className="text-center">
                {/* 404 数字 */}
                <h1 className="text-9xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                    404
                </h1>

                {/* 装饰性斜线 */}
                <div className="mt-4 flex justify-center">
                    <span className="relative inline-block rotate-12 rounded-full bg-blue-500 px-3 py-1 text-sm font-semibold text-white">
                        页面未找到
                    </span>
                </div>

                {/* 描述文字 */}
                <p className="mt-6 max-w-md text-lg text-gray-600 dark:text-gray-300">
                    抱歉，您访问的页面不存在。可能是链接错误，或者该页面已被移除。
                </p>

                {/* 返回首页按钮 */}
                <div className="mt-8">
                    <Link
                        href="/dashboard/invoices"
                        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
                    >
                        Go Back
                    </Link>
                </div>

                {/* 可选：添加一个简约插图（用纯 Tailwind 实现） */}
                <div className="mt-12">
                    <div className="mx-auto h-32 w-32 overflow-hidden rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-700">
                        <div className="relative h-full w-full">
                            {/* 简约房子图标示意 */}
                            <div className="absolute bottom-4 left-1/2 h-8 w-8 -translate-x-1/2 transform border-b-4 border-l-4 border-r-4 border-gray-400 dark:border-gray-500" />
                            <div className="absolute bottom-0 left-1/2 h-4 w-16 -translate-x-1/2 transform rounded-t-lg bg-gray-300 dark:bg-gray-600" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}