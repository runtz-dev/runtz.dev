'use client';

import { CheckIcon } from 'lucide-react';
import {
  Timeline,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from '@/components/reui/timeline';
import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/cn';

type MilestoneStatus = 'completed' | 'running' | 'pending';

const milestones = [
  {
    title: 'Project Initialized',
    status: 'completed',
  },
  {
    title: 'First Release Candidate Version Publicated',
    status: 'completed',
  },
  {
    title: 'First GitHub Star',
    status: 'completed',
  },
  {
    title: 'First Client',
    status: 'completed',
  },
  {
    title: 'Keep building Release Candidate Version',
    status: 'running',
  },
  {
    date: 'Jan 2027',
    title: 'Launch Runtz',
    emphasizedTitle: '1.0.0 Version',
    status: 'pending',
  },
  {
    date: 'Feb 2027',
    title: 'Launch Dast on platform',
    status: 'pending',
  },
] satisfies ReadonlyArray<{
  date?: string;
  title: string;
  emphasizedTitle?: string;
  status: MilestoneStatus;
}>;

function StatusBadge({ status }: { status: MilestoneStatus }) {
  if (status === 'completed') {
    return (
      <Badge
        variant="outline"
        className="rz-roadmap-badge rz-roadmap-badge-completed size-5 p-0"
        aria-label="Completed"
        title="Completed"
      >
        <CheckIcon data-icon="inline-start" />
      </Badge>
    );
  }

  if (status === 'running') {
    return (
      <Badge variant="outline" className="rz-roadmap-badge rz-roadmap-badge-running">
        <Spinner data-icon="inline-start" className="motion-reduce:animate-none" />
        Running
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className="rz-roadmap-badge rz-roadmap-badge-pending">
      Pending
    </Badge>
  );
}

function MilestoneIndicator({ status }: { status: MilestoneStatus }) {
  if (status === 'completed') {
    return (
      <TimelineIndicator className="rz-roadmap-indicator rz-roadmap-indicator-completed">
        <CheckIcon />
      </TimelineIndicator>
    );
  }

  if (status === 'running') {
    return (
      <TimelineIndicator className="rz-roadmap-indicator rz-roadmap-indicator-running">
        <Spinner className="motion-reduce:animate-none" />
      </TimelineIndicator>
    );
  }

  return (
    <TimelineIndicator className="rz-roadmap-indicator rz-roadmap-indicator-pending">
      <span className="rz-roadmap-indicator-dot" />
    </TimelineIndicator>
  );
}

export function RoadmapTimeline() {
  return (
    <div className="rz-roadmap-frame rounded-2xl border px-5 py-10 sm:px-7 md:px-12 md:py-12">
      <h2 className="sr-only">Product milestones</h2>
      <Timeline
        defaultValue={4}
        className="mx-auto w-full max-w-3xl"
        render={<ol aria-label="Runtz product milestones" />}
      >
        {milestones.map((milestone, index) => (
          <TimelineItem
            key={milestone.title}
            step={index + 1}
            render={<li />}
            className={cn(
              'min-h-18 pb-8 last:min-h-0 last:pb-0 md:w-[calc(50%-1.5rem)] md:pb-9',
              'md:odd:ms-auto md:even:me-auto md:even:text-right md:even:group-data-[orientation=vertical]/timeline:ms-0 md:even:group-data-[orientation=vertical]/timeline:me-8',
              'md:even:group-data-[orientation=vertical]/timeline:**:data-[slot=timeline-indicator]:right-[-1.5rem] md:even:group-data-[orientation=vertical]/timeline:**:data-[slot=timeline-indicator]:left-auto',
              'md:even:group-data-[orientation=vertical]/timeline:**:data-[slot=timeline-indicator]:translate-x-1/2 md:even:group-data-[orientation=vertical]/timeline:**:data-[slot=timeline-separator]:right-[-1.5rem]',
              'md:even:group-data-[orientation=vertical]/timeline:**:data-[slot=timeline-separator]:left-auto md:even:group-data-[orientation=vertical]/timeline:**:data-[slot=timeline-separator]:translate-x-1/2',
            )}
          >
            <TimelineHeader>
              <TimelineSeparator className="rz-roadmap-separator" />
              {milestone.date && (
                <TimelineDate className="rz-roadmap-date mb-1 font-mono text-[11px] font-semibold uppercase tracking-[0.08em]">
                  {milestone.date}
                </TimelineDate>
              )}
              <div
                className={cn(
                  'flex items-start gap-2.5 md:even:justify-end',
                  milestone.status === 'running' && 'max-md:flex-col max-md:gap-1.5',
                )}
              >
                <TimelineTitle className="text-base font-semibold leading-6 md:text-[17px]">
                  {milestone.title}
                  {milestone.emphasizedTitle && (
                    <strong className="font-bold"> {milestone.emphasizedTitle}</strong>
                  )}
                </TimelineTitle>
                <StatusBadge status={milestone.status} />
              </div>
              <MilestoneIndicator status={milestone.status} />
            </TimelineHeader>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  );
}
