"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, ArrowRightLeft, PieChart, Send, ShieldCheck, ArrowRight } from "lucide-react";

export function Features({ user }: { user: boolean }) {
    return (
        <section className="relative w-full border-t border-slate-200/80 bg-slate-50 py-32 overflow-hidden transition-colors">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Section Header with Enterprise Polish */}
                <div className="flex flex-col items-center text-center mb-24 gap-5">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 px-4 py-1.5 text-xs font-semibold text-ink shadow-2xs uppercase tracking-wider transition-transform duration-300 hover:scale-105">
                        <ShieldCheck className="h-4 w-4 text-ink" />
                        Engineered for Modern Enterprise &amp; Scale
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-heading font-bold tracking-tight text-ink max-w-4xl text-balance">
                        Precision pricing and execution architecture
                    </h2>
                    <p className="max-w-2xl text-lg text-muted-foreground font-normal leading-relaxed">
                        Eliminate operational drag, eradicate underpricing, and orchestrate client lifecycle flows with sub-millisecond precision.
                    </p>
                </div>

                {/* Bento Grid Features Layout with Micro-Interactions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-20">

                    {/* Feature 1: Smart Pricing Calculator */}
                    <Card className="md:col-span-2 rounded-2xl border border-slate-200/90 bg-white shadow-xs text-left flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-slate-300 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-100/50 rounded-full blur-2xl group-hover:bg-button-bg/10 transition-all duration-500 pointer-events-none" />
                        <CardContent className="p-8 sm:p-12 flex flex-col justify-between h-full gap-10 relative z-10">
                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100 border border-slate-200/80 text-ink transition-all duration-300 group-hover:bg-button-bg group-hover:border-button-bg group-hover:scale-110">
                                <Calculator className="h-6 w-6 text-ink" />
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-2xl sm:text-3xl font-heading font-bold tracking-tight text-ink">
                                    Algorithmic Pricing Sheets &amp; Margin Guardrails
                                </h3>
                                <p className="text-base sm:text-lg text-muted-foreground font-normal leading-relaxed">
                                    Synthesize target labor economics, dynamic asset line items, and overhead ratios into deterministic, high-margin quotes designed to optimize lifetime customer value.
                                </p>
                            </div>
                            <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-ink uppercase tracking-wider">
                                <span className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-brand" />
                                    Deterministic Margin Control
                                </span>
                                <span className="text-slate-400 group-hover:translate-x-1 transition-transform duration-300">
                                    <ArrowRight className="h-4 w-4" />
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Feature 2: Quote Sharing */}
                    <Card className="rounded-2xl border border-slate-200/90 bg-white shadow-xs text-left flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-slate-300 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-100/50 rounded-full blur-2xl group-hover:bg-callout/10 transition-all duration-500 pointer-events-none" />
                        <CardContent className="p-8 sm:p-12 flex flex-col justify-between h-full gap-10 relative z-10">
                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100 border border-slate-200/80 text-ink transition-all duration-300 group-hover:bg-callout group-hover:text-white group-hover:border-callout group-hover:scale-110">
                                <Send className="h-6 w-6" />
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-2xl font-heading font-bold tracking-tight text-ink">
                                    Frictionless Public Quote Pipelines
                                </h3>
                                <p className="text-base text-muted-foreground font-normal leading-relaxed">
                                    Generate secure, cryptographically tokenized URLs allowing real-time stakeholder approvals without requiring accounts.
                                </p>
                            </div>
                            <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-ink uppercase tracking-wider">
                                <span className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-action" />
                                    Instant Conversion
                                </span>
                                <span className="text-slate-400 group-hover:translate-x-1 transition-transform duration-300">
                                    <ArrowRight className="h-4 w-4" />
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Feature 3: Order Pipeline Tracking */}
                    <Card className="rounded-2xl border border-slate-200/90 bg-white shadow-xs text-left flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-slate-300 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-100/50 rounded-full blur-2xl group-hover:bg-button-bg/10 transition-all duration-500 pointer-events-none" />
                        <CardContent className="p-8 sm:p-12 flex flex-col justify-between h-full gap-10 relative z-10">
                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100 border border-slate-200/80 text-ink transition-all duration-300 group-hover:bg-button-bg group-hover:border-button-bg group-hover:scale-110">
                                <ArrowRightLeft className="h-6 w-6 text-ink" />
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-2xl font-heading font-bold tracking-tight text-ink">
                                    Full Lifecycle Order Tracing
                                </h3>
                                <p className="text-base text-muted-foreground font-normal leading-relaxed">
                                    Monitor asset execution checkpoints seamlessly from initial estimate distribution through to successful milestone delivery.
                                </p>
                            </div>
                            <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-ink uppercase tracking-wider">
                                <span className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-brand" />
                                    Zero Latency Sync
                                </span>
                                <span className="text-slate-400 group-hover:translate-x-1 transition-transform duration-300">
                                    <ArrowRight className="h-4 w-4" />
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Feature 4: Financial & Cash Flow Dashboard */}
                    <Card className="md:col-span-2 rounded-2xl border border-slate-200/90 bg-white shadow-xs text-left flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-slate-300 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-100/50 rounded-full blur-2xl group-hover:bg-callout/10 transition-all duration-500 pointer-events-none" />
                        <CardContent className="p-8 sm:p-12 flex flex-col justify-between h-full gap-10 relative z-10">
                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100 border border-slate-200/80 text-ink transition-all duration-300 group-hover:bg-callout group-hover:text-white group-hover:border-callout group-hover:scale-110">
                                <PieChart className="h-6 w-6" />
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-2xl sm:text-3xl font-heading font-bold tracking-tight text-ink">
                                    Real-time Liquidity &amp; Receivables Telemetry
                                </h3>
                                <p className="text-base sm:text-lg text-muted-foreground font-normal leading-relaxed">
                                    Aggregate monthly revenues, calculate outstanding accounts receivable, and surface automated delinquency alarms to protect enterprise solvency.
                                </p>
                            </div>
                            <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-ink uppercase tracking-wider">
                                <span className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-action" />
                                    Automated Solvency Audits
                                </span>
                                <span className="text-slate-400 group-hover:translate-x-1 transition-transform duration-300">
                                    <ArrowRight className="h-4 w-4" />
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                </div>

                {/* Bottom Callout Banner with Institutional Polish */}
                <div className="rounded-3xl bg-ink p-10 sm:p-16 text-center text-white flex flex-col items-center gap-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] bg-size-[16px_16px] pointer-events-none" />
                    <h3 className="text-3xl sm:text-5xl font-heading font-bold tracking-tight relative z-10 max-w-2xl text-balance">
                        Scale your pricing infrastructure today.
                    </h3>
                    <p className="max-w-xl text-base sm:text-lg text-slate-300 font-normal leading-relaxed relative z-10">
                        Provision your workspace in seconds. High-performance computing built specifically for professional service providers.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full sm:w-auto justify-center text-ink">
                        {!user ? (
                            <div className="flex flex-row gap-3">
                                <Link href="/signup" className={`${buttonVariants()} bg-brand hover:bg-brand/90 font-semibold px-8 py-6 text-base transition-transform duration-300 hover:scale-105 shadow-lg`}>
                                    Initialize free workspace
                                </Link>
                                <Link href="/login" className={`${buttonVariants({ variant: "outline" })} border bg-none hover:bg-ink dark:text-muted-foreground px-8 py-6 text-base transition-transform duration-300 hover:scale-105`}>
                                    Access authentication portal
                                </Link>
                            </div>
                        ) : (
                            null)}

                    </div>
                </div>

            </div>
        </section>
    );
}