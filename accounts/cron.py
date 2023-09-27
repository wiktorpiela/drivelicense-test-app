from django_cron import CronJobBase, Schedule
from django.contrib.auth.models import User

class CronTestView(CronJobBase):
    RUN_EVERY_MIN = 1
    schedule = Schedule(run_every_mins=RUN_EVERY_MIN)
    code = 'testjob'

    def do(self):
        inactive_users = User.objects.filter(is_active=False)   
        print(inactive_users)
        for user in inactive_users:
            user.delete()